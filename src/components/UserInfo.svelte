<script>
    let name = '';
    let email = '';
  </script>
  
  <div class="user-info">
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} />
    </label>
  </div>
  
  <style>
    .user-info {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }
    label {
      margin-bottom: 1rem;
    }
  </style>
  