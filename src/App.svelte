<script>
    import Header from './components/Header.svelte';
    import UserInfo from './components/UserInfo.svelte';
    import GamesTable from './components/GamesTable.svelte';
    import GenerateStickers from './components/GenerateStickers.svelte';
  </script>
  
  <main>
    <Header title="Bazaar Entry" />
    <UserInfo />
    <GamesTable />
    <GenerateStickers />
  </main>
  
  <style>
    main {
      padding: 2rem;
    }
  </style>
  