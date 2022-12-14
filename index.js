const checkForKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        resolve(result['openai-key']);
      });
    });
};

const saveKey = () => {
    const input = document.getElementById('key_input');

  if (input) {
    const { value } = input;
    // Encode String
    const encodedValue = encode(value);

    // Save to google storage
    chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    });
  }
};

const changeKey = () => {
        document.getElementById('key_needed').style.display = 'block';
        document.getElementById('key_entered').style.display = 'none';
};

const encode = (input) => {
    return btoa(input);
};

document.getElementById('save_key_button').addEventListener('click', saveKey);
document.getElementById('change_key_button').addEventListener('click', changeKey);

// We wait for the promise to resolve and then we set it accordingly. If the key is there, show the key_entered UI
checkForKey().then((response) => {
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    }
  });