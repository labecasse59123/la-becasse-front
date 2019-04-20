import React from 'react';

import logo from 'img/logo.png';

/** Home page. */
export default function () {
  return (
    <div>
      <h1>Bienvenue sur le site de l&apos;association La Bécasse de Bray-Dunes</h1>
      <p>
        Amateurs de <strong>Chasse de passionnés</strong>,
         nous sommes une association impliquée dans le
         développement du gibier local, sa protection, son repeuplement et son élevage.
      </p>
      <p>
        Afin de garantir la qualité de la chasse,
         et de maîtriser notre impact sur l&apos;environnement, les demandes d&apos;adhésion
        à notre association sont limitées à 40 personnes.
      </p>
      <img src={logo} alt="Logo de l'association La Bécasse" style={{ width: '100%', maxWidth: '800px', maxHeight: '500px' }} />
      <p>
        Fondée en 1979, l&apos;association propose à ses adhérents
         un domaine de chasse qui s&apos;étend sur la réserve naturelle
         de la Dune du Perroquet, à Bray-Dunes.
      </p>
    </div>
  );
}
