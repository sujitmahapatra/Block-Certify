import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Web3 Certify ${year}`}</footer>;
};

export default Footer;
