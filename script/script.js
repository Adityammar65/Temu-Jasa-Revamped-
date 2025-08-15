//ALERT FUNCTION
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

//CARD MODAL REVIEW
function initJasaPopup(cardSelector, modalId) {
  document.addEventListener("DOMContentLoaded", function () {
    const jasaCards = document.querySelectorAll(cardSelector);
    const modal = new bootstrap.Modal(document.getElementById(modalId));

    jasaCards.forEach(card => {
      card.addEventListener("click", function (e) {
        e.preventDefault();

        const nama = this.dataset.cardName;
        const gambar = this.dataset.previewImage;
        const tagline = this.dataset.cardTagline;
        const category = this.dataset.cardCategory;
        const kontak = this.dataset.kontak;
        const layanan = this.dataset.layanan;

        document.getElementById("jasaModalLabel").textContent = nama;
        document.getElementById("jasaImage").src = gambar;
        document.getElementById("jasaTagline").textContent = tagline;
        document.getElementById("jasaCategory").textContent = category;
        document.getElementById("jasaKontak").textContent = kontak;
        document.getElementById("jasaLayanan").textContent = layanan;

        modal.show();
      });
    });
  });
}
initJasaPopup(".jasa-card", "jasaModal");
