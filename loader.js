/* ---------- VisQuanta Custom Agent Setup — LOADER (v2) ----------
Embeds the widget as an iframe and forwards config via the query string.

USAGE (where you place the widget):
<script
  src="https://<your-gh-username>.github.io/v1-custom-agent-set-up/loader.js"
  data-widget-src="https://<your-gh-username>.github.io/v1-custom-agent-set-up/widget.html"

  data-location-id="{{location.id}}"
  data-business-name="{{custom_values.business_name}}"

  data-fetch-url="https://api.visquanta.com/webhook/call-value-data"
  data-submit-url="https://api.visquanta.com/webhook/custom-agent-set-up"

  data-auth-header="Authorization"
  data-auth-token="Bearer {{your_secret_here}}"

  data-apikey-header="x-api-key"        <!-- optional -->
  data-apikey="abc123"                  <!-- optional -->

  <!-- Optional key mapping + prefills for Agent 1 -->
  data-key-active="{{ custom_values.custom_campaign_agent_1__active_yes_or_leave_blank }}"
  data-key-bump1="{{ custom_values.custom_campaign_agent_1__bump_1 }}"
  data-key-bump2="{{ custom_values.custom_campaign_agent_1__bump_2 }}"
  data-key-bump3="{{ custom_values.custom_campaign_agent_1__bump_3 }}"
  data-key-campaign="{{ custom_values.custom_campaign_agent_1__campaign_name }}"
  data-key-firstmsg="{{ custom_values.custom_campaign_agent_1__first_message }}"
  data-key-cadence="{{ custom_values.custom_campaign_agent_1__follow_up_cadence }}"
  data-key-perday="{{ custom_values.custom_campaign_agent_1__how_many_per_day_see_sop }}"
  data-key-notes="{{ custom_values.custom_campaign_agent_1__notes_about_campaign }}"

  data-value-active="Yes"
  data-value-bump1=""
  data-value-bump2=""
  data-value-bump3=""
  data-value-campaign=""
  data-value-firstmsg=""
  data-value-cadence="IM > 15m > 24h > 24h"
  data-value-perday="100"
  data-value-notes=""
></script>
------------------------------------------------------------------ */

(function () {
  try {
    const s = document.currentScript;
    if (!s) return;

    const src = s.getAttribute("data-widget-src");
    if (!src) {
      console.error("widget.html URL missing (data-widget-src)");
      return;
    }

    // Helper to safely read attributes
    const attr = (name, dflt = "") => {
      const v = s.getAttribute(name);
      return v == null ? dflt : v;
    };

    // Build query params for the iframe
    const pass = new URLSearchParams();

    // Required-ish
    const locationId   = attr("data-location-id");
    const businessName = attr("data-business-name");
    if (locationId)   pass.set("locationId", locationId);
    if (businessName) pass.set("businessName", businessName);

    // Webhook URLs — widget expects percent-encoded values and will decode them
    const fetchUrl  = attr("data-fetch-url");
    const submitUrl = attr("data-submit-url");
    if (fetchUrl)  pass.set("fetchUrl",  encodeURIComponent(fetchUrl));
    if (submitUrl) pass.set("submitUrl", encodeURIComponent(submitUrl));

    // Auth headers
    const authHeader = attr("data-auth-header");
    const authToken  = attr("data-auth-token");
    if (authHeader) pass.set("authHeader", authHeader);
    if (authToken)  pass.set("authToken", authToken);

    // Optional API key header/value
    const apiKeyHeader = attr("data-apikey-header");
    const apiKeyValue  = attr("data-apikey");
    if (apiKeyHeader) pass.set("apiKeyHeader", apiKeyHeader);
    if (apiKeyValue)  pass.set("apiKey", apiKeyValue);

    // Keys + optional prefills (Agent 1 default mapping; widget can override per-agent internally)
    const keyNames = ["active","bump1","bump2","bump3","campaign","firstmsg","cadence","perday","notes"];
    keyNames.forEach(name => {
      const keyAttr = attr(`data-key-${name}`);
      if (keyAttr) pass.set(`key_${name}`, keyAttr);

      // Only forward prefill if author provided the attribute
      if (s.hasAttribute(`data-value-${name}`)) {
        pass.set(`val_${name}`, attr(`data-value-${name}`));
      }
    });

    // Compose final URL
    const url = `${src}?${pass.toString()}`;

    // Build iframe
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "0";
    iframe.setAttribute("title", "Custom agent 1 set up");

    // Insert after the script tag
    s.parentNode && s.parentNode.insertBefore(iframe, s.nextSibling);
  } catch (e) {
    console.error("Loader error:", e);
  }
})();
