import { dataObj } from "src/app/types";
import { getAge } from '../helpers'

export const contactEmail = (data: dataObj) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refactored.</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: Arial, sans-serif;
        }

        table {
            border-collapse: collapse;
        }

        img {
            border: 0;
            outline: none;
            text-decoration: none;
            display: block;
        }

        a {
            color: #3b6a99 !important;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .content {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
            border-radius: 4px;
        }

        .header {
            background-color: #2fc4b2;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }

        .info {
            padding: 20px;
        }

        .info-separator {
            margin: 35px 0;
        }

        .goodby {
            margin: 50px 0;
        }

        .article {
            padding: 20px;
            border-bottom: 1px solid #808080;
        }

        .article:last-child {
            border-bottom: none;
        }

        .article h2 {
            font-size: 18px;
            margin: 0 0 10px;
            color: #333;
        }

        .article p {
            font-size: 18px;
            margin: 0 0 10px;
            color: #666;
        }

        .nav {
            text-align: center;
            margin: 30px 0 20px 0;
        }

        .nav a {
            padding: 0 10px;
            border-radius: 5px;
        }
        
        .unsubscribe {
            color: white !important;
            background-color: #114b5f;
            padding: .5rem;
            border-radius: .5rem;
            text-decoration: none !important;
        }
    </style>
</head>

<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <table class="content" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="header">
                            <h1>Audiología MEF</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div  class="article" style="border: none;">
                                <h1>Hola Marisa,</h1>
                                <h2>Tenés un nuevo mensaje${data.from ? ' de ' + data.from : ''}</h2>
                                <p style="margin: 2rem 0 1rem;"><strong>De: </strong>${data.name || ''} (${data.email || ''})</p>
                                <p><strong>Mensaje: </strong>${data.message || ''}</p>
                            </div>
                            <div class="info">
                                <div class="goodby">
                                    <p>Un cordial saludo,</p>
                                    <p>Lic. María Elisa Fontana</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>&copy; 2025 Audiología MEF</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`

export const newBookingClient = (data: dataObj) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refactored.</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: Arial, sans-serif;
        }

        table {
            border-collapse: collapse;
        }

        img {
            border: 0;
            outline: none;
            text-decoration: none;
            display: block;
        }

        a {
            color: #3b6a99 !important;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .content {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
            border-radius: 4px;
        }

        .header {
            background-color: #2fc4b2;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            text-align: center;
            font-size: 1rem;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }

        .info {
            padding: 0 20px;
        }

        .info-separator {
            margin: 35px 0;
        }

        .goodby {
            margin: 50px 0;
            color: #666;
            font-size: 1rem;
        }

        .article {
            padding: 20px;
            border-bottom: 1px solid #808080;
        }

        .article:last-child {
            border-bottom: none;
        }

        .article h2 {
            font-size: 18px;
            margin: 0 0 10px;
            color: #333;
        }

        .article p {
            font-size: 18px;
            margin: 0 0 10px;
            color: #666;
        }

        .nav {
            text-align: center;
            margin: 30px 0 20px 0;
        }

        .nav a {
            padding: 0 10px;
            border-radius: 5px;
        }
        
        .unsubscribe {
            color: white !important;
            background-color: #114b5f;
            padding: .5rem;
            border-radius: .5rem;
            text-decoration: none !important;
        }
        
        .calendar-button {
            margin: 1rem auto;
            width: 100%;
            outline: none;
            border: transparent;
            padding: .7rem;
            border-radius: .5rem;
            cursor: pointer !important;
            background: #2fc4b2;
            color: #fff;
            font-size: 1rem;
        }
    </style>
</head>

<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <table class="content" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="header">
                            <h1>Audiología MEF</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div  class="article" style="border: none;">
                                <h1>Hola ${data.firstName},</h1>
                                <h2>${data.isUpdate ? 'Tu turno ha sido modificado' : '¡Turno confirmado!'}</h2>
                                <p  style="margin-bottom: 2rem">${data.isUpdate ? 'Estos son los nuevos detalles' : 'Estos son los detalles'}:</p>
                                <p><strong>Estudio: </strong>${data.studyName || ''}</p>
                                <p><strong>Fecha y hora: </strong>${new Date(data.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong>Profesional: </strong>${data.professional || 'Lic. María Elisa Fontana'}</p>
                                
                                <a href=${data.calendarLink} target="_blank"><button class="calendar-button">Agregar turno a Google Calendar</button></a>
                                
                                <p style="margin: 2rem 0">Y esta es la información personal:</p>
                                 <p><strong>Nombre completo: </strong>${data.firstName || ''} ${data.lastName || ''}</p>
                                 <p><strong>Fecha de nacimiento: </strong>${data.age ? `${new Date(data.age).toLocaleDateString('es-ES')}` + ` (${getAge(data.age)})` : 'no registrado'}</p>
                                 <p><strong>Email: </strong>${data.email || 'no registrado'}</p>
                                 <p><strong>Teléfono: </strong>${data.phone || 'no registrado'}</p>
                                 <p style="font-size: 1rem; margin-top: 4rem;">Recordá que para cancelar o cambiar el turno, debés comunicarte con nosotros con al menos 24 horas de antelación.<br/>Si hay modificaciones en tu turno, nos comunicaremos a traves de los medios compartidos.<br/>Cancelá tu turno <a href="https://audiologia-mef.vercel.app/turno?id=${data._id}">haciendo click acá</a>.</p>
                            </div>
                            <div class="info">
                                <div class="goodby">
                                    <p>Un cordial saludo,</p>
                                    <p>Lic. María Elisa Fontana</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>&copy; 2025 Audiología MEF</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`

export const newBookingAdmin = (data: dataObj) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refactored.</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: Arial, sans-serif;
        }

        table {
            border-collapse: collapse;
        }

        img {
            border: 0;
            outline: none;
            text-decoration: none;
            display: block;
        }

        a {
            color: #3b6a99 !important;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .content {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
            border-radius: 4px;
        }

        .header {
            background-color: #2fc4b2;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            text-align: center;
            font-size: 1rem;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }

        .info {
            padding: 0 20px;
        }

        .info-separator {
            margin: 35px 0;
        }

        .goodby {
            margin: 50px 0;
            color: #666;
            font-size: 1rem;
        }

        .article {
            padding: 20px;
            border-bottom: 1px solid #808080;
        }

        .article:last-child {
            border-bottom: none;
        }

        .article h2 {
            font-size: 18px;
            margin: 0 0 10px;
            color: #333;
        }

        .article p {
            font-size: 18px;
            margin: 0 0 10px;
            color: #666;
        }

        .nav {
            text-align: center;
            margin: 30px 0 20px 0;
        }

        .nav a {
            padding: 0 10px;
            border-radius: 5px;
        }
        
        .unsubscribe {
            color: white !important;
            background-color: #114b5f;
            padding: .5rem;
            border-radius: .5rem;
            text-decoration: none !important;
        }
        
        .calendar-button {
            margin: 1rem auto;
            width: 100%;
            outline: none;
            border: transparent;
            padding: .7rem;
            border-radius: .5rem;
            cursor: pointer !important;
            background: #2fc4b2;
            color: #fff;
            font-size: 1rem;
        }
    </style>
</head>

<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <table class="content" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="header">
                            <h1>Audiología MEF</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div  class="article" style="border: none;">
                                <h1>Hola Marisa,</h1>
                                <h2>${data.isUpdate ? 'Se modificó un turno.' : '¡Nuevo turno confirmado!'}</h2>
                                <p style="margin-bottom: 2rem">${data.isUpdate ? 'Estos son los nuevos detalles' : 'Estos son los detalles'}:</p>
                                <p><strong>Estudio: </strong><span color="color: #c58000;">${data.studyName || ''}</span></p>
                                <p><strong>Fecha y hora: </strong><span color="color: #c58000;">${new Date(data.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span></p>
                                <p><strong>Profesional: </strong>${data.professional || 'Lic. María Elisa Fontana'}</p>
                                
                                <a href=${data.calendarLink} target="_blank"><button class="calendar-button">Agregar turno a Google Calendar</button></a>
                                
                                <p style="margin: 2rem 0">Y esta es la información del paciente:</p>
                                 <p><strong>Nombre completo: </strong><span color="color: #c58000;">${data.firstName || ''} ${data.lastName || ''}</span></p>
                                 <p><strong>Fecha de nacimiento: </strong>${data.age ? `${new Date(data.age).toLocaleDateString('es-ES')}` + ` (${getAge(data.age)})` : 'no registrado'}</p>
                                 <p><strong>Email: </strong>${data.email || 'no registrado'}</p>
                                 <p><strong>Teléfono: </strong>${data.phone || 'no registrado'}</p>
                            </div>
                            <div class="info">
                                <div class="goodby">
                                    <p>Un cordial saludo,</p>
                                    <p>Lic. María Elisa Fontana</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>&copy; 2025 Audiología MEF</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`

export const cancelBooking = (data: dataObj) => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refactored.</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: Arial, sans-serif;
        }

        table {
            border-collapse: collapse;
        }

        img {
            border: 0;
            outline: none;
            text-decoration: none;
            display: block;
        }

        a {
            color: #3b6a99 !important;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .content {
            width: 100%;
            max-width: 560px;
            margin: 0 auto;
            border-radius: 4px;
        }

        .header {
            background-color: #2fc4b2;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        .footer {
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
            text-align: center;
            font-size: 1rem;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }

        .info {
            padding: 0 20px;
        }

        .info-separator {
            margin: 35px 0;
        }

        .goodby {
            margin: 50px 0;
            color: #666;
            font-size: 1rem;
        }

        .article {
            padding: 20px;
            border-bottom: 1px solid #808080;
        }

        .article:last-child {
            border-bottom: none;
        }

        .article h2 {
            font-size: 18px;
            margin: 0 0 10px;
            color: #333;
        }

        .article p {
            font-size: 18px;
            margin: 0 0 10px;
            color: #666;
        }

        .nav {
            text-align: center;
            margin: 30px 0 20px 0;
        }

        .nav a {
            padding: 0 10px;
            border-radius: 5px;
        }
        
        .unsubscribe {
            color: white !important;
            background-color: #114b5f;
            padding: .5rem;
            border-radius: .5rem;
            text-decoration: none !important;
        }
        
        .calendar-button {
            margin: 1rem auto;
            width: 100%;
            outline: none;
            border: transparent;
            padding: .7rem;
            border-radius: .5rem;
            cursor: pointer !important;
            background: #2fc4b2;
            color: #fff;
            font-size: 1rem;
        }
    </style>
</head>

<body>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">
                <table class="content" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="header">
                            <h1>Audiología MEF</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div  class="article" style="border: none;">
                                <h1>Hola ${data.bookingMessage ? data.firstName : 'Marisa'},</h1>
                                <h1>Turno cancelado</h1>
                                <p  style="margin-bottom: 2rem">Estos son los detalles:</p>
                                <p><strong>Estudio: </strong>${data.studyName || ''}</p>
                                <p><strong>Fecha y hora: </strong><del>${new Date(data.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</del></p>
                                <p><strong>Profesional: </strong>${data.professional || 'Lic. María Elisa Fontana'}</p>
                                 <p><strong>Nombre completo: </strong>${data.firstName || ''} ${data.lastName || ''}</p>
                                 <p><strong>Fecha de nacimiento: </strong>${data.age ? `${new Date(data.age).toLocaleDateString('es-ES')}` + `(${getAge(data.age)})` : 'no registrado'}</p>
                                 <p><strong>Email: </strong>${data.email || 'no registrado'}</p>
                                 <p><strong>Teléfono: </strong>${data.phone || 'no registrado'}</p>
                                 
                                 <p style="margin-top: 3rem;">${data.bookingMessage ? 'Si necesitás agendar un nuevo turno, <a href="https://audiologia-mef.vercel.app/turnos">hacelo acá</a>.' : ''}</p>
                            </div>
                            <div class="info">
                                <div class="goodby">
                                    <p>Un cordial saludo,</p>
                                    <p>Lic. María Elisa Fontana</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="footer">
                            <p>&copy; 2025 Audiología MEF</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>
`