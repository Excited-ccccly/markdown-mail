export interface SmtpConfiguration {
    user: String,
    password: String,
    host: String
}
export interface TlsConfiguration {
    ciphers: String
}
export interface EmailConfiguration {
    text: String,
    from: String,
    to: String,
    cc: String,
    subject: String,
    attachment: Array<Object>
}