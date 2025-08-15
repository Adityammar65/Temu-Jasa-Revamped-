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
let jasaDipilih = null;

function pickFormIdByName(category) {
  if (/website/i.test(category)) return "formWebsite";
  if (/video/i.test(category)) return "formVideo";
  if (/design/i.test(category)) return "formDesign";
}

function initJasaPopup(cardSelector, modalId) {
  document.addEventListener("DOMContentLoaded", function () {
    const jasaCards = document.querySelectorAll(cardSelector);
    const modalDetail = new bootstrap.Modal(document.getElementById(modalId));

    jasaCards.forEach(card => {
      card.addEventListener("click", function (e) {
        if (e.target.closest(".toggle-alert, button, a[data-direct]")) return;

        e.preventDefault();

        const { cardName, previewImage, cardTagline, cardCategory, kontak, layanan } = this.dataset;
        jasaDipilih = { nama: cardName, gambar: previewImage, tagline: cardTagline, category: cardCategory, kontak, layanan };

        document.getElementById("jasaModalLabel").textContent = jasaDipilih.nama;
        document.getElementById("jasaImage").src = jasaDipilih.gambar || "";
        document.getElementById("jasaTagline").textContent = jasaDipilih.tagline || "";
        document.getElementById("jasaCategory").textContent = jasaDipilih.category || "";
        document.getElementById("jasaKontak").textContent = jasaDipilih.kontak || "";
        document.getElementById("jasaLayanan").textContent = jasaDipilih.layanan || "";

        modalDetail.show();
      });
    });

    document.getElementById("btnPesanJasa").addEventListener("click", function (e) {
      e.preventDefault();

      const nama = document.getElementById("jasaModalLabel").textContent.trim();
      const gambar = document.getElementById("jasaImage").src;
      const tagline = document.getElementById("jasaTagline").textContent;
      const category = document.getElementById("jasaCategory").textContent;
      const kontak = document.getElementById("jasaKontak").textContent;
      const layanan = document.getElementById("jasaLayanan").textContent;

      jasaDipilih = { nama, gambar, tagline, category, kontak, layanan };

      const targetId = pickFormIdByName(jasaDipilih.category);
      const formEl = document.getElementById(targetId);
      if (!formEl) return;

      const inputNama = formEl.querySelector("#formNamaJasa");
      if (inputNama) inputNama.value = jasaDipilih.category || "";

      const modalPreview = bootstrap.Modal.getInstance(document.getElementById("jasaModal"));
      if (modalPreview) modalPreview.hide();

      bootstrap.Modal.getOrCreateInstance(formEl).show();
    });

    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-pesan");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const card = btn.closest(cardSelector);
      if (!card) return;

      const { cardName, previewImage, cardTagline, cardCategory, kontak, layanan } = card.dataset;
      jasaDipilih = { nama: cardName, gambar: previewImage, tagline: cardTagline, category: cardCategory, kontak, layanan };

      const targetId = pickFormIdByName(jasaDipilih.category);
      const formEl = document.getElementById(targetId);
      if (!formEl) return;

      try { modalDetail.hide(); } catch (_) { }
      bootstrap.Modal.getOrCreateInstance(formEl).show();
    });
  });
}

initJasaPopup(".jasa-card", "jasaModal");