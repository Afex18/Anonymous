// EmailJS config
const PUBLIC_KEY   = 'GTfzhmomQntX21rLS';
const SERVICE_ID   = 'service_z6rbvcc';
const TEMPLATE_ID  = 'template_tg1198b';

// Init EmailJS
emailjs.init(PUBLIC_KEY);

// DOM refs
const form       = document.getElementById('confession-form');
const textarea   = document.getElementById('message');
const countEl    = document.getElementById('count');
const charCount  = document.querySelector('.char-count');
const sendBtn    = document.getElementById('send-btn');
const successMsg = document.getElementById('success-msg');
const errorMsg   = document.getElementById('error-msg');

// Character counter
textarea.addEventListener('input', () => {
  const len = textarea.value.length;
  countEl.textContent = len;
  charCount.classList.toggle('warn', len >= 900);
});

// Form submit
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const message = textarea.value.trim();
  if (!message) return;

  // Loading state
  sendBtn.disabled = true;
  sendBtn.classList.add('loading');
  sendBtn.textContent = 'Sending';
  errorMsg.classList.add('hidden');

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, { message });

    // Success
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');

  } catch (err) {
    console.error('EmailJS error:', err);

    // Reset button
    sendBtn.disabled = false;
    sendBtn.classList.remove('loading');
    sendBtn.textContent = 'Send anonymously';

    // Show error
    errorMsg.classList.remove('hidden');
  }
});