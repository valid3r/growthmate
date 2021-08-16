<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">


    <!-- ===============================================-->
    <!--    Document Title-->
    <!-- ===============================================-->
    <title>GrowthMate - Easy Goal Management</title>

    <!-- ===============================================-->
    <!--    Favicons-->
    <!-- ===============================================-->
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="../assets/img/favicons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="../assets/img/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="../assets/img/favicons/favicon-16x16.png"
    />
    <link
      rel="shortcut icon"
      type="image/x-icon"
      href="../assets/img/favicons/favicon.ico"
    />
    <link rel="manifest" href="../assets/img/favicons/manifest.json" />
    <meta
      name="msapplication-TileImage"
      content="../assets/img/favicons/mstile-150x150.png"
    />
    <meta name="theme-color" content="#ffffff" />
    <script src="../assets/js/config.js"></script>
    <script src="../vendors/overlayscrollbars/OverlayScrollbars.min.js"></script>

    <!-- ===============================================-->
    <!--    Stylesheets-->
    <!-- ===============================================-->
    <link href="../vendors/glightbox/glightbox.min.css" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700%7cPoppins:300,400,500,600,700,800,900&amp;display=swap"
      rel="stylesheet"
    />

    <link href="../vendors/flatpickr/flatpickr.min.css" rel="stylesheet" />

    <link
      href="../vendors/overlayscrollbars/OverlayScrollbars.min.css"
      rel="stylesheet"
    />
    <link
      href="../assets/css/theme-rtl.min.css"
      rel="stylesheet"
      id="style-rtl"
    />
    <link
      href="../assets/css/theme.min.css"
      rel="stylesheet"
      id="style-default"
    />
    <link
      href="../assets/css/user-rtl.min.css"
      rel="stylesheet"
      id="user-style-rtl"
    />
    <link
      href="../assets/css/user.min.css"
      rel="stylesheet"
      id="user-style-default"
    />

    <script>
      var isRTL = JSON.parse(localStorage.getItem('isRTL'))
      if (isRTL) {
        var linkDefault = document.getElementById('style-default')
        var userLinkDefault = document.getElementById('user-style-default')
        linkDefault.setAttribute('disabled', true)
        userLinkDefault.setAttribute('disabled', true)
        document.querySelector('html').setAttribute('dir', 'rtl')
      } else {
        var linkRTL = document.getElementById('style-rtl')
        var userLinkRTL = document.getElementById('user-style-rtl')
        linkRTL.setAttribute('disabled', true)
        userLinkRTL.setAttribute('disabled', true)
      }
    </script>
  </head>


  <body >
    <!--   <body> -->
    <!-- ===============================================-->
    <!--    Main Content-->
    <!-- ===============================================-->

        <main class="main" id="root"></main>
    <!-- ===============================================-->
    <!--    End of Main Content-->
    <!-- ===============================================-->

    <!-- ===============================================-->
    <!--    JavaScripts-->
    <!-- ===============================================-->
    <script src="../vendors/popper/popper.min.js"></script>
    <script src="../vendors/bootstrap/bootstrap.min.js"></script>
    <script src="../vendors/anchorjs/anchor.min.js"></script>
    <script src="../vendors/is/is.min.js"></script>

    <!--Flatpickr Not Working -->
    <script src="../assets/js/flatpickr.js"></script>

    <script src="../vendors/prism/prism.js"></script>
    <script src="../vendors/glightbox/glightbox.min.js"></script>
    <script src="../assets/js/emoji-button.js"></script>
    <script src="../vendors/fontawesome/all.min.js"></script>
    <script src="../vendors/lodash/lodash.min.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=window.scroll"></script>
    <script src="../vendors/list.js/list.min.js"></script>
    <script src="../assets/js/theme.js"></script>



    <script src="{{asset('js/app.js')}}"></script>
  </body>
</html>
