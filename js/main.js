/* ============================================================
   Shore Waves Trading Company — Chemical Division
   Shared site scripts + page-specific logic (vanilla JS)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the menu when a link is chosen (mobile)
    siteNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Scroll-in reveal animations ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Animated stat counters (home) ---------- */
  var counters = document.querySelectorAll('.stat-num[data-target]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    } else {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
      });
    }
  }

  /* ============================================================
     Product catalog data
     cats: commodity | solvents | boiler | chiller | water | ro | equipment
     ============================================================ */
  var PRODUCTS = [
    { name: 'Sodium Hypochlorite 12%', packing: '36 Kg/Can – 30 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Sodium Hypochlorite 12%', packing: '1200 Kg/IBC – 1000 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Sulfuric Acid 98%', packing: '37 Kg/Can – 20 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Sulfuric Acid 98%', packing: '1800 Kg/IBC – 1000 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Caustic Soda 49%', packing: '45 Kg/Can – 30 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Caustic Soda 49%', packing: '1500 Kg/IBC – 1000 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Hydrochloric Acid 31-33% (HCL)', packing: '35 Kg/Can – 30 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Hydrochloric Acid 31-33% (HCL, IBC)', packing: '1150 Kg/IBC – 1000 Ltr', app: 'Commodity Chemicals', origin: 'KSA', cats: ['commodity'] },
    { name: 'Citric Acid', packing: '25 Kg/Bag', app: 'Commodity', origin: 'China', cats: ['commodity'] },
    { name: 'Soya Lecithin', packing: '200 Kg/Drum', app: 'Commodity', origin: 'KSA', cats: ['commodity'] },
    { name: 'Sodium Metabisulfite', packing: '25 Kg/Bag', app: 'Commodity / Water Treatment', origin: 'Thailand', cats: ['commodity', 'water'] },
    { name: 'Tri Sodium Phosphate', packing: '25 Kg/Bag', app: 'Commodity / Water Treatment', origin: 'China', cats: ['commodity', 'water'] },
    { name: 'Boric Acid', packing: '25 Kg/Bag', app: 'Steel Industry / Pesticide', origin: 'KSA', cats: ['commodity'] },
    { name: 'Methylene Chloride', packing: '270 Kg/Drum', app: 'Paint Industry', origin: 'North America', cats: ['solvents'] },
    { name: 'Xylene', packing: '180 Kg/Drum', app: 'Paint / Coating / Pesticide', origin: 'Korea', cats: ['solvents'] },
    { name: 'Butyl Acetate', packing: '180 Kg/Drum', app: 'Paint / Coating / Pesticide', origin: 'China', cats: ['solvents'] },
    { name: 'Methyl Ethyl Ketone (MEK)', packing: '165 Kg/Drum', app: 'Solvent', origin: 'Netherlands', cats: ['solvents'] },
    { name: 'Toluene', packing: '180 Kg/Drum', app: 'Solvent', origin: 'Taiwan', cats: ['solvents'] },
    { name: 'Ethanol 96%', packing: '165 Kg/Drum', app: 'Solvent', origin: 'Pakistan', cats: ['solvents'] },
    { name: 'Methanol 99.9%', packing: '165 Kg/Drum', app: 'Solvent', origin: 'KSA', cats: ['solvents'] },
    { name: 'Acetone (SASOL)', packing: '160 Kg/Drum', app: 'Solvent', origin: 'South Africa', cats: ['solvents'] },
    { name: 'Boiler Compound Achilles SW 100B', packing: '25 Kg/Drum', app: 'Boiler Treatment', origin: 'KSA', cats: ['boiler'] },
    { name: 'Oxygen Scavenger Achilles SW 106B', packing: '25 Kg/Drum', app: 'Boiler Treatment', origin: 'KSA', cats: ['boiler'] },
    { name: 'pH Booster Achilles SW 136B', packing: '25 Kg/Drum', app: 'Boiler Treatment', origin: 'KSA', cats: ['boiler'] },
    { name: 'Condensate Treatment Amine Based Achilles SW 131B', packing: '25 Kg/Drum', app: 'Boiler Treatment', origin: 'KSA', cats: ['boiler'] },
    { name: 'Corrosion Inhibitor (Molybdate) Achilles SW 306', packing: '25 Kg/Drum', app: 'Chiller Treatment', origin: 'KSA', cats: ['chiller'] },
    { name: 'Corrosion Inhibitor (Nitrite) Achilles SW 300', packing: '25 Kg/Drum', app: 'Chiller Treatment', origin: 'KSA', cats: ['chiller'] },
    { name: 'Non-Oxidizing Biocide Achilles SW 316', packing: '25 Kg/Drum', app: 'Chiller Treatment', origin: 'KSA', cats: ['chiller'] },
    { name: 'Anti Scalant – Polymer Based Achilles SW 401', packing: '25 Kg/Drum', app: 'R.O / Desalination', origin: 'KSA', cats: ['ro'] },
    { name: 'Anti Scalant – Inorganic Based Achilles SW 403', packing: '25 Kg/Drum', app: 'Cooling Tower', origin: 'KSA', cats: ['water', 'chiller'] },
    { name: 'Filmtec Membrane BW 30-400 Dry', packing: '8 inches', app: 'Water Treatment', origin: 'KSA', cats: ['water', 'ro'] },
    { name: 'Membrane B-400', packing: '8 inches', app: 'Water Treatment', origin: 'Germany', cats: ['water', 'ro'] },
    { name: 'Chemical Dosing Pump Pulsatron', packing: '—', app: 'Water Treatment', origin: 'USA', cats: ['equipment', 'water'] },
    { name: 'Chemical Dosing Pump Emec', packing: '—', app: 'Water Treatment', origin: 'Italy', cats: ['equipment', 'water'] },
    { name: 'Chemical Dosing Pump Grundfos', packing: '—', app: 'Water Treatment', origin: 'France', cats: ['equipment', 'water'] },
    { name: 'Cartridge Filter 40", 5 Micron', packing: '—', app: 'Water Treatment', origin: 'China', cats: ['equipment', 'water'] },
    { name: 'Cartridge Filter 30", 5 Micron', packing: '—', app: 'Water Treatment', origin: 'China', cats: ['equipment', 'water'] },
    { name: 'Cartridge Filter 20", 5 Micron', packing: '—', app: 'Water Treatment', origin: 'China', cats: ['equipment', 'water'] },
    { name: 'Cartridge Filter 10", 5 Micron', packing: '—', app: 'Water Treatment', origin: 'China', cats: ['equipment', 'water'] },
    { name: 'Calcium Hypo Hi-Clear', packing: '45 Kg/Drum', app: 'Water Treatment', origin: 'India', cats: ['water'] },
    { name: 'Trichloroisocyanuric Acid (TCCA) 90% Tablet', packing: '50 Kg/Drum', app: 'Water Treatment', origin: 'India', cats: ['water'] },
    { name: 'Ferric Chloride 40%', packing: '300 Kg/Drum', app: 'Commodity Chemicals', origin: 'India', cats: ['commodity'] }
  ];

  // Expose for the contact page dropdown
  window.SW_PRODUCTS = PRODUCTS;

  /* ============================================================
     Products page: search + filter + render
     ============================================================ */
  var tableBody = document.getElementById('product-rows');

  if (tableBody) {
    var searchInput = document.getElementById('product-search');
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
    var countEl = document.getElementById('results-count');
    var activeFilter = 'all';

    function escapeHtml(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function renderRows() {
      var q = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
      var rows = PRODUCTS.filter(function (p) {
        var matchesFilter = activeFilter === 'all' || p.cats.indexOf(activeFilter) !== -1;
        var haystack = (p.name + ' ' + p.app + ' ' + p.origin).toLowerCase();
        var matchesSearch = !q || haystack.indexOf(q) !== -1;
        return matchesFilter && matchesSearch;
      });

      if (!rows.length) {
        tableBody.innerHTML = '<tr><td colspan="5"><div class="no-results">No products match your search. Try a different term or filter — or <a href="contact.html">contact us</a> for special sourcing.</div></td></tr>';
      } else {
        tableBody.innerHTML = rows.map(function (p) {
          var quoteHref = 'contact.html?product=' + encodeURIComponent(p.name);
          return '<tr>' +
            '<td class="p-name">' + escapeHtml(p.name) + '</td>' +
            '<td>' + escapeHtml(p.packing) + '</td>' +
            '<td>' + escapeHtml(p.app) + '</td>' +
            '<td><span class="origin-tag">' + escapeHtml(p.origin) + '</span></td>' +
            '<td><a class="btn btn-accent btn-sm" href="' + quoteHref + '">Request Quote</a></td>' +
            '</tr>';
        }).join('');
      }

      if (countEl) {
        countEl.textContent = 'Showing ' + rows.length + ' of ' + PRODUCTS.length + ' products';
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeFilter = chip.getAttribute('data-filter');
        chips.forEach(function (c) {
          var isActive = c === chip;
          c.classList.toggle('active', isActive);
          c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        renderRows();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', renderRows);
    }

    // Pre-apply ?filter= from Industries page links
    var params = new URLSearchParams(window.location.search);
    var preFilter = params.get('filter');
    if (preFilter) {
      var chipMatch = chips.filter(function (c) { return c.getAttribute('data-filter') === preFilter; })[0];
      if (chipMatch) {
        activeFilter = preFilter;
        chips.forEach(function (c) {
          var isActive = c === chipMatch;
          c.classList.toggle('active', isActive);
          c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
      }
    }

    renderRows();
  }

  /* ============================================================
     Contact page: product dropdown, ?product= pre-fill,
     validation, and mailto fallback submit
     ============================================================ */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var productSelect = document.getElementById('cf-product');

    // Populate the "Product of Interest" dropdown (unique names)
    if (productSelect) {
      var seen = {};
      PRODUCTS.forEach(function (p) {
        if (seen[p.name]) return;
        seen[p.name] = true;
        var opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name;
        productSelect.appendChild(opt);
      });

      // Pre-fill from ?product= query parameter (Request Quote buttons)
      var cparams = new URLSearchParams(window.location.search);
      var requested = cparams.get('product');
      if (requested) {
        if (!seen[requested]) {
          var extra = document.createElement('option');
          extra.value = requested;
          extra.textContent = requested;
          productSelect.appendChild(extra);
        }
        productSelect.value = requested;
        var msgField = document.getElementById('cf-message');
        if (msgField && !msgField.value) {
          msgField.value = 'Hello, I would like to request a quotation for: ' + requested + '.\n\nQuantity required: \nDelivery location: ';
        }
      }
    }

    function setInvalid(fieldEl, invalid) {
      var wrap = fieldEl.closest('.form-field');
      if (wrap) wrap.classList.toggle('invalid', invalid);
      fieldEl.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      return !invalid;
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = document.getElementById('cf-name');
      var companyEl = document.getElementById('cf-company');
      var emailEl = document.getElementById('cf-email');
      var phoneEl = document.getElementById('cf-phone');
      var messageEl = document.getElementById('cf-message');

      var ok = true;
      ok = setInvalid(nameEl, nameEl.value.trim().length < 2) && ok;
      ok = setInvalid(emailEl, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) && ok;
      ok = setInvalid(phoneEl, !/^[+\d][\d\s\-()]{6,}$/.test(phoneEl.value.trim())) && ok;
      ok = setInvalid(messageEl, messageEl.value.trim().length < 10) && ok;

      if (!ok) {
        var firstInvalid = contactForm.querySelector('.form-field.invalid input, .form-field.invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var product = productSelect && productSelect.value ? productSelect.value : 'General Inquiry';
      var subject = 'Quote Request — ' + product + ' — ' + nameEl.value.trim();
      var body =
        'Name: ' + nameEl.value.trim() + '\n' +
        'Company: ' + (companyEl.value.trim() || '—') + '\n' +
        'Email: ' + emailEl.value.trim() + '\n' +
        'Phone: ' + phoneEl.value.trim() + '\n' +
        'Product of Interest: ' + product + '\n\n' +
        'Message:\n' + messageEl.value.trim();

      window.location.href = 'mailto:sales@shorewaves.com.sa' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });

    // Clear the error state as the user corrects a field
    contactForm.addEventListener('input', function (e) {
      var wrap = e.target.closest('.form-field');
      if (wrap && wrap.classList.contains('invalid')) {
        wrap.classList.remove('invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
