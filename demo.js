// Démonstration Orbitoile : le formulaire n'envoie rien et ne garde rien.
document.addEventListener('submit', function (ev) {
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var etat = ev.target.querySelector('.etat');
  if (etat) etat.textContent = 'Ceci est une démonstration : aucune demande n’est envoyée ni enregistrée. Pour un site comme celui-ci, rendez-vous sur orbitoile.fr.';
}, true);
