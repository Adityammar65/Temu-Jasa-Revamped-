document.addEventListener('DOMContentLoaded', function () {
  const alertBox = document.getElementById('alert');
  const alertMessage = document.getElementById('alert-message');
  const buttons = document.querySelectorAll('.toggle-alert');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const message = btn.getAttribute('data-message');
      alertMessage.textContent = message;

      alertBox.style.display = 'flex';
      alertBox.style.opacity = '1';

      setTimeout(() => {
        alertBox.style.transition = 'opacity 1s';
        alertBox.style.opacity = '0';
        setTimeout(() => {
          alertBox.style.display = 'none';
          alertBox.style.opacity = '1';
        }, 500);
      }, 2000);
    });
  });
});
