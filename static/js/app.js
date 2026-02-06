var MyScroll = "";
(function (window, document, $, undefined) {
  "use strict";
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(
      navigator.userAgent
    )
      ? !0
      : !1;
  var Scrollbar = window.Scrollbar;
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    methods: function (e) {
      Init.w();
      Init.BackToTop();
      Init.preloader();
      Init.header();
      Init.slick();
      Init.countryCode();
      Init.categoryToggle();
      Init.filterSearch();
      Init.passwordIcon();
      Init.countdownInit(".countdown", "2026/07/01");
      Init.formValidation();
      Init.contactForm();
      Init.dropdown();
      Init.quantityHandle();
      Init.showReview();
    },

    BackToTop: function () {
      var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
      var rootElement = document.documentElement;
      
      // Check if scrollToTopBtn exists
      if (!scrollToTopBtn) {
        return;
      }
      
      function handleScroll() {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        if (rootElement.scrollTop / scrollTotal > 0.05) {
          scrollToTopBtn.classList.add("showBtn");
        } else {
          scrollToTopBtn.classList.remove("showBtn");
        }
      }
      function scrollToTop() {
        rootElement.scrollTo({ top: 0, behavior: "smooth" });
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
      document.addEventListener("scroll", handleScroll);
    },

    preloader: function () {
      setTimeout(function () {
        $("#preloader").hide("slow");
      }, 2000);
    },

    showReview: function () {
      // Check if review-btn exists before binding events
      if ($(".review-btn").length === 0) {
        return;
      }
      
      $(".review-btn").on("click", function () {
        $(".review-btn").removeClass("te-button");
        var id = $(this).attr("data-atr");
        $(this).addClass("te-button");

        // Hide all review blocks slowly
        $(".review-block").hide("slow");

        // Show the selected review block slowly
        $("#" + id).show("slow");
      });
    },
    teamMemberShow: function (e) {
      // Check if member elements exist
      if ($(".member").length === 0) {
        return;
      }
      
      $(".member").on("click", function () {
        var id = $(this).attr("id");
        $(".member").removeClass("active");
        $(this).addClass("active");
        $(".member-details").hide("slow");
        $("." + id).show("slow");
      });
    },

    serviceShow: function (e) {
      $(".service_title").on("click", function () {
        var id = $(this).attr("id");
        $(".service_title").removeClass("active");
        $(this).addClass("active");
        $(".service-detail").hide("slow");
        $("." + id).show("slow");
      });
    },

    w: function (e) {
      if (isMobile) {
        $("body").addClass("is-mobile");
      }
    },

    header: function () {
      function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];
        selector.find("li").each(function () {
          let anchor = $(this).find("a");
          if ($(anchor).attr("href") == FileName) {
            $(this).addClass("current");
          }
        });
        selector.children("li").each(function () {
          if ($(this).find(".current").length) {
            $(this).addClass("current");
          }
        });
        if ("" == FileName) {
          selector.find("li").eq(0).addClass("current");
        }
      }
      if ($(".main-menu__list").length) {
        let mainNavUL = $(".main-menu__list");
        dynamicCurrentMenuClass(mainNavUL);
      }
      if ($(".main-menu__nav").length && $(".mobile-nav__container").length) {
        let navContent = document.querySelector(".main-menu__nav").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".mobile-nav__container"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".sticky-header__content").length) {
        let navContent = document.querySelector(".main-menu").innerHTML;
        let mobileNavContainer = document.querySelector(
          ".sticky-header__content"
        );
        mobileNavContainer.innerHTML = navContent;
      }
      if ($(".mobile-nav__container .main-menu__list").length) {
        let dropdownAnchor = $(
          ".mobile-nav__container .main-menu__list .dropdown > a"
        );
        dropdownAnchor.each(function () {
          let self = $(this);
          let toggleBtn = document.createElement("BUTTON");
          toggleBtn.setAttribute("aria-label", "dropdown toggler");
          toggleBtn.innerHTML = "<i class='fa fa-angle-down'></i>";
          self.append(function () {
            return toggleBtn;
          });
          self.find("button").on("click", function (e) {
            e.preventDefault();
            let self = $(this);
            self.toggleClass("expanded");
            self.parent().toggleClass("expanded");
            self.parent().parent().children("ul").slideToggle();
          });
        });
      }
      if ($(".mobile-nav__toggler").length) {
        $(".mobile-nav__toggler").on("click", function (e) {
          e.preventDefault();
          $(".mobile-nav__wrapper").toggleClass("expanded");
          $("body").toggleClass("locked");
        });
      }
      $(window).on("scroll", function () {
        if ($(".stricked-menu").length) {
          var headerScrollPos = 130;
          var stricky = $(".stricked-menu");
          if ($(window).scrollTop() > headerScrollPos) {
            stricky.addClass("stricky-fixed");
          } else if ($(this).scrollTop() <= headerScrollPos) {
            stricky.removeClass("stricky-fixed");
          }
        }
      });
    },
    smoothScrollbar: function () {
      if ($("body").hasClass("tt-smooth-scroll")) {
        if (!isMobile) {
          class AnchorPlugin extends Scrollbar.ScrollbarPlugin {
            static pluginName = "anchor";
            onHashChange = () => {
              $(".header-menu").animate({ height: "toggle" });
              this.jumpToHash(window.location.hash);
            };
            jumpToHash = (hash) => {
              if (!hash) {
                return;
              }
              const { scrollbar } = this;
              scrollbar.containerEl.scrollTop = 0;
              const target = document.querySelector(hash);
              if (target) {
                scrollbar.scrollIntoView(target, {
                  offsetTop:
                    parseFloat(target.getAttribute("data-offset")) || 0,
                });
              }
            };
            onInit() {
              this.jumpToHash(window.location.hash);
              window.addEventListener("hashchange", this.onHashChange);
            }
            onDestory() {
              window.removeEventListener("hashchange", this.onHashChange);
            }
          }
          Scrollbar.use(AnchorPlugin);
          const scrollbar = Scrollbar.init(
            document.querySelector("#scroll-container"),
            { damping: 0.1, renderByPixel: !0, continuousScrolling: !0 }
          );
          $("input[type=number]").on("focus", function () {
            $(this).on("wheel", function (e) {
              e.stopPropagation();
            });
          });
          const backToTopButton = document.getElementById("back-to-top");
          scrollbar.addListener(({ offset }) => {
            if (offset.y > 300) {
              backToTopButton.style.display = "block";
            } else {
              backToTopButton.style.display = "none";
            }
          });
          backToTopButton.addEventListener("click", () => {
            scrollbar.scrollTo(0, 0, 500);
          });
        }
      }
    },
    slick: function () {
      if ($(".breaking-news-slider").length) {
        $(".breaking-news-slider").slick({
          infinite: true,
          slidesToShow: 1,
          arrows: false,
          autoplay: true,
          cssEase: "linear",
          autoplaySpeed: 0,
          speed: 8000,
          variableWidth: true,
          centerMode: true,
          pauseOnFocus: false,
          pauseOnHover: false,
        });
      }

      if ($(".newsslider").length) {
        $(".newsslider").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplaySpeed: 4000,
          arrows: false,
          autoplay: false,
          swipe: true,
          pauseOnFocus: false,
          pauseOnHover: false,
          dots: false,
          fade: false,
          responsive: [
            {
              breakpoint: 1399, // For tablets and small laptops
              settings: {
                slidesToShow: 4, // Show 3 slides
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024, // For tablets in portrait mode
              settings: {
                slidesToShow: 3, // Show 2 slides
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768, // For tablets in portrait mode
              settings: {
                slidesToShow: 1, // Show 2 slides
                slidesToScroll: 1,
              },
            },
          ],
        });
      }

      $(".btn-prev").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickPrev");
      });
      $(".btn-next").click(function () {
        var $this = $(this).attr("data-slide");
        $("." + $this).slick("slickNext");
      });
    },

    // Countdown Timer
    countryCode: function (countdownSelector, countdownTime, countdown) {
      $(function () {
        var code = "+01 123 456 789"; // Assigning value from model.
        $("#mobile").val(code);
        $("#mobile").intlTelInput({
          autoHideDialCode: true,
          autoPlaceholder: "ON",
          dropdownContainer: document.body,
          formatOnDisplay: true,
          initialCountry: "us",
          placeholderNumberType: "MOBILE",
          preferredCountries: ["us", "gb", "in"],
          separateDialCode: true,
        });
        $("#btn-submit").on("click", function () {
          var code = $("#mobile").intlTelInput(
            "getSelectedCountryData"
          ).dialCode;
          var phoneNumber = $("#mobile").val();
          document.getElementById("code").innerHTML = code;
          document.getElementById("mobile-number").innerHTML = phoneNumber;
        });
      });
    },

    quantityHandle: function () {
      $(".decrement").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        if (qtyVal > 0) {
          qtyInput.val(qtyVal - 1);
        }
      });
      $(".increment").on("click", function () {
        var qtyInput = $(this).closest(".quantity-wrap").children(".number");
        var qtyVal = parseInt(qtyInput.val());
        qtyInput.val(parseInt(qtyVal + 1));
      });
    },

    dropdown: function () {
      const selectedAll = document.querySelectorAll(".wrapper-dropdown");

      selectedAll.forEach((selected) => {
        const arrow = selected.querySelector("#drp-arrow"); // Correct arrow selection
        const optionsContainer = selected.querySelector(".topbar-dropdown"); // Correct ul list selection
        const optionsList = selected.querySelectorAll("li.item");

        selected.addEventListener("click", () => {
          if (selected.classList.contains("active")) {
            handleDropdown(selected, arrow, false);
          } else {
            let currentActive = document.querySelector(
              ".wrapper-dropdown.active"
            );

            if (currentActive) {
              let anotherArrow = currentActive.querySelector("#drp-arrow");
              handleDropdown(currentActive, anotherArrow, false);
            }

            handleDropdown(selected, arrow, true);
          }
        });

        // Update the display of the dropdown when an option is clicked
        optionsList.forEach((o) => {
          o.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the dropdown from closing when selecting an option
            selected.querySelector(".selected-display").innerHTML = o.innerHTML;
            handleDropdown(selected, arrow, false); // Close the dropdown after selection
          });
        });
      });

      // Close the dropdown when clicking outside
      window.addEventListener("click", function (e) {
        if (!e.target.closest(".wrapper-dropdown")) {
          closeAllDropdowns();
        }
      });

      function closeAllDropdowns() {
        selectedAll.forEach((selected) => {
          let arrow = selected.querySelector("#drp-arrow");
          handleDropdown(selected, arrow, false);
        });
      }

      function handleDropdown(dropdown, arrow, open) {
        if (open) {
          arrow.classList.add("rotated");
          dropdown.classList.add("active");
        } else {
          arrow.classList.remove("rotated");
          dropdown.classList.remove("active");
        }
      }
    },

    categoryToggle: function () {
      if ($(".customer-container").length) {
        $(".signin-button").click(function () {
          $(".sign-form").slideToggle();
        });
      }
      if ($(".sidebar").length) {
        $(".shop-filter").on("click", function () {
          $(".toggle-sidebar").toggleClass("active");
          $(".overlay").toggleClass("active");
        });

        // Hide sidebar and overlay when overlay is clicked
        $(".overlay").on("click", function () {
          $(".toggle-sidebar").removeClass("active");
          $(this).removeClass("active");
        });
      }
      if ($("#difrent-ship").length) {
        $("#difrent-ship").on("click", function () {
          $(".box-hide").animate({ height: "toggle" }, 300);
        });
      }
    },

    filterSearch: function () {
      if ($("#searchInput").length) {
        $("#searchInput").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $(".blogs-block").filter(function () {
            var hasMatch =
              $(this).find(".blog-title").text().toLowerCase().indexOf(value) >
              -1;
            $(this).toggle(hasMatch);
          });
        });
      }
    },
    passwordIcon: function () {
      $("#eye , #eye-icon").click(function () {
        if ($(this).hasClass("fa-eye-slash")) {
          $(this).removeClass("fa-eye-slash");
          $(this).addClass("fa-eye");
          $(".password-input").attr("type", "text");
        } else {
          $(this).removeClass("fa-eye");
          $(this).addClass("fa-eye-slash");
          $(".password-input").attr("type", "password");
        }
      });
    },
    countdownInit: function (countdownSelector, countdownTime, countdown) {
      var eventCounter = $(countdownSelector);
      if (eventCounter.length) {
        eventCounter.countdown(countdownTime, function (e) {
          $(this).html(
            e.strftime(
              "<li><h4>%D</h4><p>Days</p></li>\
              <li><h4>%H</h4><p>Hrs</p></li>\
              <li><h4>%M</h4><p>Mins</p></li>\
              <li><h4>%S</h4><p>Secs</p></li>"
            )
          );
        });
      }
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
      if ($(".login-form").length) {
        $(".login-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
        e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h3 class='color-primary mt-12 mb-12'>Email Sent Successfully</h3>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h4 class='color-primary mt-12 mb-12'>There is an error</h4>";
              }
              $("#messages").show("slow");
              $("#messages").slideDown("slow");
              setTimeout(function () {
                $("#messages").slideUp("hide");
                $("#messages").hide("slow");
              }, 4000);
            },
          });
        } else {
          return !1;
        }
      });
    },
  };
  Init.i();
})(window, document, jQuery);
