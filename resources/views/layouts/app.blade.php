<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>React Laravel Login</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    </head>

    <body>
        <div class="container">
            <div class="row">
                @yield('content')
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}" defer></script>
    </body>
    @yield('extrajs')
    
</html>
