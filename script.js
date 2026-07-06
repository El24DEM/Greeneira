setTimeout(() => {
  document.querySelector('.saludo-inicial').classList.add('saludo-oculto');
  document.querySelector('.contenido-final').classList.add('contenido-visible');
}, 2500);

window.addEventListener("DOMContentLoaded", () => {
  const prices = {
    "Brownie clásico": 8000,
    "Brownie cubierto": 10000,
    "Brownie doble": 17000,
    "Chocolates": 5000,
    "Galletas cubiertas": 7000
  };

  function updateSummary() {
    const cards = document.querySelectorAll(".product-card");
    const orderList = document.getElementById("orderList");
    const totalPriceEl = document.getElementById("totalPrice");
    if (!orderList || !totalPriceEl) return;
    let total = 0;
    let html = "";
    cards.forEach(card => {
      const name = card.querySelector("h2").innerText;
      const qty = parseInt(card.querySelector(".qty").innerText);
      if (qty > 0) {
        const price = prices[name] * qty;
        total += price;
        html += `<p>🍫 ${name} × ${qty} — $${price.toLocaleString()} COP</p>`;
      }
    });
    orderList.innerHTML = html || `<p class="empty-order">Aún no has agregado productos.</p>`;
    totalPriceEl.innerText = `$${total.toLocaleString()} COP`;
  }

  document.querySelectorAll(".product-card").forEach(card => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const qty = card.querySelector(".qty");
    if (!minus || !plus || !qty) return;
    let count = 0;
    plus.addEventListener("click", () => {
      count++;
      qty.textContent = count;
      updateSummary();
    });
    minus.addEventListener("click", () => {
      if (count > 0) count--;
      qty.textContent = count;
      updateSummary();
    });
  });

  const btnEnviar = document.getElementById("sendOrder");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name")?.value || "Sin nombre";
      const phone = document.getElementById("phone")?.value || "Sin teléfono";
      const cards = document.querySelectorAll(".product-card");
      let orderText = "";
      cards.forEach(card => {
        const nameProd = card.querySelector("h2").innerText;
        const qty = card.querySelector(".qty").innerText;
        if (parseInt(qty) > 0) orderText += `${nameProd} x ${qty}, `;
      });

      const url = "https://script.google.com/macros/s/AKfycbxBKUZjRi7nKDeOQdiVLanC6uEuGpzuNmvKrgQxfjlIgigbbomFAVIzX3AgjcR73TPb/exec";

      try {
        await fetch(`${url}?nombre=${encodeURIComponent(name)}&telefono=${encodeURIComponent(phone)}&pedido=${encodeURIComponent(orderText)}` , {mode: "no-cors"});
        window.location.href = "entrega.html";
      } catch (error) {
        console.error("Error al enviar:", error);
        alert("Hubo un error al enviar el pedido.");
      }
    });
  }
  
  updateSummary();
});
