function makeEmail(userName, verificationURL) {
    return `
    <table role="presentation" style="margin:0;padding:0;width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
          <tr>
            <td align="center" style="padding:0px 0 0px 0;background:#ffffff;">
              <img src="https://i.ibb.co/9VZqy61/kapusta.png" alt="" style="height:auto;display:block;border-bottom-left-radius: 100px;" />
            </td>
          </tr>
          <tr style="background-color: #ffffff;">
            <td style="padding:36px 30px 42px 30px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background-color: #990f0f;">
                <tr style="background-color: #ffffff;">
                  <td style="padding:0 0 36px 0;color:#000;">
                    <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Registration confirmation</h1>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Thank you <span style="color:#FF751D">${userName}</span> for the registration in our Service!</p>
                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Please follow the link below to confirm your email in the system:</p>
                    <div style="margin: 30px 0px 0px 0px;background:#FF751D;width: 120px;height: 35px;border-radius: 5px;">
                      <a href="${verificationURL}" style="text-decoration:none;width: 124px;height: 35px">
                        <div style="color: #ffffff; margin: 30px 0px 0px 0px;background:#FF751D;width: 120px;height: 35px; padding-top: 15px;padding-left: 16px;border-radius: 5px;">Confirm email</div>
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;background:#0e0d0d;">
              <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                <tr>
                  <td style="padding:0;width:50%;" align="left">
                    <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                      &reg; Kapusta33, GOIT 2021<br/>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `
}

module.exports = makeEmail;