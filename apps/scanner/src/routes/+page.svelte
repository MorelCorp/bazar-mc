<script lang="ts">
    import { onMount } from 'svelte';
    import { appendRow, getSheetData } from '@shared/google-sheets/sheets-api';

    let qrContent = '';
    let spreadsheetId = '1uHEDDcUD-cJr9wjnvMdtCKjHRc0uyTrK-2NpULOncpc';
    let range = 'Sheet1!A1:D1';

    const handleScan = async (result: string) => {
        qrContent = result;
        await appendRow(spreadsheetId, range, [qrContent, new Date().toISOString()]);
    };

    onMount(async () => {
        const data = await getSheetData(spreadsheetId, range);
        console.log(data);
    });
</script>

<main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Scanner App</h1>
    <p>Scan a QR code to add data to Google Sheets.</p>
    <input type="text" bind:value={qrContent} readonly class="input mb-4" />
    <!-- Implement QR code scanning logic here -->
    <button class="btn variant-filled" on:click={() => handleScan('Sample QR Code Data')}>Scan QR Code</button>
</main>
  