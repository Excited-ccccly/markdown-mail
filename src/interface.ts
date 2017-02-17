export interface SmtpConfiguration {
    user: String,
    password: String,
    host: String,
    tls: TlsConfiguration
}
export interface TlsConfiguration {
    ciphers: String
}
export interface EmailConfiguration {
    from: String,
    to: String,
    cc: String,
    subject: String,
    attachment: Array<Object>
}