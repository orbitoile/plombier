// Site généré par Orbitoile. Aucun cookie, aucun service extérieur au chargement.
(function () {
  // Ferme le menu mobile quand on choisit une rubrique.
  document.querySelectorAll('.menu-panneau a').forEach(function (lien) {
    lien.addEventListener('click', function () {
      var menu = lien.closest('details');
      if (menu) menu.removeAttribute('open');
    });
  });

  // Formulaire de devis : envoi par Web3Forms si une clé est prévue, sinon e-mail prérempli.
  var form = document.querySelector('.formulaire');
  if (!form) return;
  var etat = form.querySelector('.etat');
  function val(nom) {
    var c = form.elements[nom];
    return c ? String(c.value || '').trim() : '';
  }
  function dire(t) { if (etat) etat.textContent = t; }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    var piege = form.elements['botcheck'];
    if (piege && piege.checked) return;
    var dest = form.getAttribute('data-email');
    var tel = form.getAttribute('data-tel');
    var sujet = 'Demande de devis : ' + val('besoin') + ' (' + val('nom') + ')';
    var corps = 'Nom : ' + val('nom') + '\nTéléphone : ' + val('telephone') + '\nE-mail : ' + val('email') +
      '\nCommune : ' + val('commune') + '\nBesoin : ' + val('besoin') + '\n\n' + val('message');
    var cle = form.getAttribute('data-cle');
    var bouton = form.querySelector('button[type="submit"]');

    if (!cle) {
      window.location.href = 'mailto:' + dest + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);
      dire('Votre messagerie s’ouvre avec la demande prête à envoyer. Si rien ne s’ouvre, écrivez à ' + dest + ' ou appelez le ' + tel + '.');
      return;
    }
    if (bouton) bouton.disabled = true;
    dire('Envoi en cours…');
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: cle, subject: sujet, from_name: val('nom'), name: val('nom'),
        email: val('email') || undefined, telephone: val('telephone'), commune: val('commune'),
        besoin: val('besoin'), message: val('message'), botcheck: ''
      })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && d.success) {
        form.reset();
        dire('Merci, votre demande est bien partie. Réponse au plus vite.');
      } else {
        throw new Error('refus');
      }
    }).catch(function () {
      dire('L’envoi n’a pas abouti. Appelez le ' + tel + ' ou écrivez à ' + dest + '.');
    }).then(function () {
      if (bouton) bouton.disabled = false;
    });
  });
})();
