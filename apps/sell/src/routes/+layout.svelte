<script lang="ts">
  export let form;
  import "../app.css";
  import { setupI18n, _ } from "@shared/i18n";

  // Initialize i18n
  setupI18n();
</script>

<slot {form} />
