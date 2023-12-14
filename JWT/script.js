document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('jwtForm');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const scope = document.getElementById('scope').value;
        const user = document.getElementById('user').value;
        const password = document.getElementById('password').value;

        // Payload
        const payload = {
            scope: scope,
            user: user,
            iat: Math.floor(Date.now() / 1000)
        };

        // Generate JWT
        const header = {alg: 'HS256', typ: 'JWT'};
        
        const sHeader = JSON.stringify(header);
        const sPayload = JSON.stringify(payload);
        const sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, password);

        document.getElementById('jwtOutput').value = sJWT;
    });
});