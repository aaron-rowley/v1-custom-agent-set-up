/* ---------- VisQuanta Custom Agent Setup — LOADER ----------

USAGE (where you place the widget):
<script
  src="https://<your-gh-username>.github.io/v1-custom-agent-set-up/loader.js"
  data-widget-src="https://<your-gh-username>.github.io/v1-custom-agent-set-up/widget.html"
  data-location-id="{{location.id}}"

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

Notes:
- data-key-* are the Custom Value KEYS so the widget knows what it is editing.
- data-value-* are OPTIONAL; if provided they prefill existing values.
------------------------------------------------------------------ */

(function () {
  try {
    const s = document.currentScript;
    const src = s.getAttribute("data-widget-src");
    if (!src) return console.error("widget.html URL missing (data-widget-src)");

    // Collect params to pass to the widget page
    const pass = new URLSearchParams();

    // Required-ish
    pass.set("locationId", s.getAttribute("data-location-id") || "");

    // Keys
    [
      "active","bump1","bump2","bump3","campaign",
      "firstmsg","cadence","perday","notes"
    ].forEach(name=>{
      const key = s.getAttribute(`data-key-${name}`) || "";
      if (key) pass.set(`key_${name}`, key);

      const val = s.getAttribute(`data-value-${name}`);
      if (val !== null) pass.set(`val_${name}`, val);
    });

    // Build iframe
    const url = `${src}?${pass.toString()}`;
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100vh";
    iframe.style.border = "0";
    iframe.setAttribute("title", "Custom agent 1 set up");

    // Insert after script
    s.parentNode.insertBefore(iframe, s.nextSibling);
  } catch (e) {
    console.error("Loader error:", e);
  }
})();
