export interface EmailConnectionConfig {
    user: String,
    password: String,
    host: String,
    tls?: Boolean,
    ssl?: Boolean
}
export interface AccountConfig {
    user: String,
    password: String,
}
export interface SmtpConfig {
    host: String,
    tls?: Boolean,
    ssl?: Boolean
}
export interface EmailContentConfig {
    from: String,
    to: String,
    cc?: String,
    subject: String,
    attachment: Array<Object>
}