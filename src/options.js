const apiKeyInput = document.getElementById('apiKey');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

// Load existing key on open
chrome.storage.local.get(['anthropicApiKey'], (result) => {
  if (result.anthropicApiKey) {
    apiKeyInput.value = result.anthropicApiKey;
  }
});

saveBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    status.textContent = 'Please enter a key.';
    status.style.color = '#f85149';
    return;
  }
  chrome.storage.local.set({ anthropicApiKey: key }, () => {
    status.textContent = 'Saved ✓';
    status.style.color = '#3fb950';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
});
