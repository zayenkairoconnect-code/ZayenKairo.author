function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.MAILERLITE_API_KEY) {
  console.error("Missing runtime variable: MAILERLITE_API_KEY");

  return jsonResponse({
    message: "Server configuration error: API key unavailable."
  }, 503);
}

if (!env.MAILERLITE_GROUP_ID) {
  console.error("Missing runtime variable: MAILERLITE_GROUP_ID");

  return jsonResponse({
    message: "Server configuration error: Group ID unavailable."
  }, 503);
}

    const contentType = request.headers.get("Content-Type") || "";

    if (!contentType.includes("application/json")) {
      return jsonResponse({
        message: "Invalid request."
      }, 415);
    }

    const body = await request.json();

    // Quietly discard automated submissions caught by the honeypot.
    if (body.website) {
      return jsonResponse({
        message: "Thank you for your interest. Please check your inbox."
      });
    }

    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return jsonResponse({
        message: "Please enter a valid email address."
      }, 400);
    }

    const mailerLiteResponse = await fetch(
      "https://connect.mailerlite.com/api/subscribers",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.MAILERLITE_API_KEY}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email,
          groups: [String(env.MAILERLITE_GROUP_ID)]
        })
      }
    );

    if (!mailerLiteResponse.ok) {
      // Do not expose MailerLite's internal response or credentials.
      return jsonResponse({
        message: "We couldn't complete your signup. Please try again."
      }, 502);
    }

    return jsonResponse({
      message: "Thank you for subscribing. Please check your inbox for a confirmation email."
    });

  } catch (error) {
    return jsonResponse({
      message: "Something went wrong. Please try again later."
    }, 500);
  }
}