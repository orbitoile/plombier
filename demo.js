// Démonstration Orbitoile : le formulaire n'envoie rien et ne garde rien.
document.addEventListener('submit', function (ev) {
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var etat = ev.target.querySelector('.etat');
  var lg = (document.documentElement.lang || 'fr').slice(0, 2);
  var textes = {
    fr: 'Ceci est une démonstration : aucune demande n’est envoyée ni enregistrée. Pour un site comme celui-ci, rendez-vous sur orbitoile.fr.',
    en: 'This is a demo: no request is sent or stored. For a website like this one, visit orbitoile.fr.',
    es: 'Esto es una demostración: no se envía ni se guarda ninguna solicitud. Para una web como esta, visite orbitoile.fr.'
  };
  if (etat) etat.textContent = textes[lg] || textes.fr;
}, true);
