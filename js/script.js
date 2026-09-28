/* =========================================================
   PT RAFFIE MANDIRI PROPERTY
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }

        });


        /* Tutup menu setelah link diklik */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });


        /* Tutup menu jika klik di luar navbar */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =====================================================
       2. HEADER SAAT SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 5px 25px rgba(0, 0, 0, 0.10)";

        } else {

            header.style.boxShadow =
                "0 3px 15px rgba(0, 0, 0, 0.04)";

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       3. BACK TO TOP
    ===================================================== */

    const backTop = document.getElementById("backTop");

    if (backTop) {

        function showBackTop() {

            if (window.scrollY > 400) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        }


        window.addEventListener("scroll", showBackTop);

        showBackTop();


        backTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       4. TAHUN OTOMATIS FOOTER
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       5. ACTIVE NAVIGATION OTOMATIS
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(".nav-menu a");

    let currentPage =
        window.location.pathname.split("/").pop();

    if (
        currentPage === "" ||
        currentPage === "/"
    ) {
        currentPage = "index.html";
    }


    navigationLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            navigationLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }

    });


    /* =====================================================
       6. SMOOTH SCROLL UNTUK LINK #
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                this.getAttribute("href");

            /*
             * Jangan memproses href="#"
             * karena biasanya digunakan pada tombol sementara.
             */

            if (!href || href === "#") {
                return;
            }

            const target =
                document.querySelector(href);

            if (target) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const position =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            }

        });

    });


    /* =====================================================
       7. FILTER GALERI
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".gallery-filter button"
        );

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (
        filterButtons.length > 0 &&
        galleryItems.length > 0
    ) {

        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    /* Hapus active */

                    filterButtons.forEach(
                        function (btn) {
                            btn.classList.remove("active");
                        }
                    );


                    /* Active button */

                    this.classList.add("active");


                    const filter =
                        this.getAttribute("data-filter");


                    /* Filter gambar */

                    galleryItems.forEach(
                        function (item) {

                            const category =
                                item.getAttribute(
                                    "data-category"
                                );


                            if (
                                filter === "all" ||
                                filter === category
                            ) {

                                item.style.display =
                                    "block";

                            } else {

                                item.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        });

    }


    /* =====================================================
       8. LIGHTBOX GALERI
    ===================================================== */

    const lightbox =
        document.getElementById(
            "galleryLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );

    const galleryViewButtons =
        document.querySelectorAll(
            ".gallery-view"
        );


    if (
        lightbox &&
        lightboxImage &&
        galleryViewButtons.length > 0
    ) {

        galleryViewButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const image =
                            this.getAttribute(
                                "data-image"
                            );

                        if (!image) return;


                        lightboxImage.src = image;

                        lightbox.classList.add(
                            "show"
                        );

                        document.body.style.overflow =
                            "hidden";

                    }
                );

            }
        );


        /* Tutup dengan tombol X */

        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                closeGalleryLightbox
            );

        }


        /* Klik area hitam */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeGalleryLightbox();

                }

            }
        );


        /* Tombol ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("show")
                ) {

                    closeGalleryLightbox();

                }

            }
        );

    }


    function closeGalleryLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

        if (lightboxImage) {
            lightboxImage.src = "";
        }

    }


    /* =====================================================
       9. FORM WHATSAPP
    ===================================================== */

    const whatsappForm =
        document.getElementById(
            "whatsappForm"
        );


    if (whatsappForm) {

        whatsappForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nama =
                    document.getElementById("nama");

                const telepon =
                    document.getElementById("telepon");

                const layanan =
                    document.getElementById("layanan");

                const pesan =
                    document.getElementById("pesan");


                if (
                    !nama ||
                    !telepon ||
                    !layanan ||
                    !pesan
                ) {

                    alert(
                        "Form belum lengkap."
                    );

                    return;

                }


                /* Validasi */

                if (
                    nama.value.trim() === "" ||
                    telepon.value.trim() === "" ||
                    layanan.value.trim() === "" ||
                    pesan.value.trim() === ""
                ) {

                    alert(
                        "Silakan lengkapi semua data terlebih dahulu."
                    );

                    return;

                }


                /*
                 * ==========================================
                 * GANTI NOMOR DI BAWAH INI
                 * ==========================================
                 *
                 * Contoh:
                 *
                 * 6285954755503
                 *
                 * menjadi:
                 *
                 * 6285954755503
                 *
                 * Jangan menggunakan:
                 * +
                 * spasi
                 * tanda -
                 */

                const nomorPerusahaan =
                    "6285954755503";


                const message =
`Halo PT Raffie Mandiri Property,

Saya ingin melakukan konsultasi mengenai layanan perusahaan.

Nama: ${nama.value.trim()}
No. WhatsApp: ${telepon.value.trim()}
Layanan: ${layanan.value}

Detail Proyek:
${pesan.value.trim()}

Terima kasih.`;


                const whatsappURL =
                    "https://wa.me/" +
                    nomorPerusahaan +
                    "?text=" +
                    encodeURIComponent(message);


                window.open(
                    whatsappURL,
                    "_blank"
                );

            }
        );

    }


    /* =====================================================
       10. FLOATING WHATSAPP BUTTON
    ===================================================== */

    const whatsappButton =
        document.querySelector(".whatsapp");


    if (whatsappButton) {

        whatsappButton.addEventListener(
            "click",
            function (event) {

                /*
                 * Jika href masih "#",
                 * gunakan nomor WhatsApp dari JS.
                 */

                const href =
                    whatsappButton.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();


                    /*
                     * GANTI DENGAN NOMOR RESMI PERUSAHAAN
                     */

                    const nomorWhatsApp =
                        "6285954755503";


                    const pesanWhatsApp =
                        "Halo PT Raffie Mandiri Property, saya ingin berkonsultasi mengenai layanan kontraktor/developer.";


                    const url =
                        "https://wa.me/" +
                        nomorWhatsApp +
                        "?text=" +
                        encodeURIComponent(
                            pesanWhatsApp
                        );


                    window.open(
                        url,
                        "_blank"
                    );

                }

            }
        );

    }


    /* =====================================================
       11. ANIMASI SAAT SCROLL
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            `
            .service-card,
            .business-card,
            .gallery-item,
            .company-value-card,
            .organization-card,
            .company-contact-item,
            .service-detail
            `
        );


    if (
        "IntersectionObserver" in window &&
        animatedElements.length > 0
    ) {

        /* Kondisi awal */

        animatedElements.forEach(
            function (element) {

                element.style.opacity = "0";

                element.style.transform =
                    "translateY(25px)";

                element.style.transition =
                    "opacity 0.6s ease, transform 0.6s ease";

            }
        );


        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.10
                }

            );


        animatedElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    }


    /* =====================================================
       12. RESPONSIVE MENU SAAT WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 900 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =====================================================
       13. PESAN CONSOLE
    ===================================================== */

    console.log(
        "PT Raffie Mandiri Property - Website berhasil dimuat."
    );

});