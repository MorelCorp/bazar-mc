<script lang="ts">
    import QRCodeGenerator from '../../components/QRCodeGenerator.svelte';
  </script>
  
  <main>
    <h1>Generate QR Code</h1>
    <QRCodeGenerator />
  </main>
  
  <style>
    main {
      padding: 1em;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      margin-bottom: 20px;
    }
  </style>
  