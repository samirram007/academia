export default function BrandMark({
    showText = true,
    className = '',
    iconClassName = 'h-6 w-6',
    textClassName = 'text-2xl font-semibold tracking-wide'
}) {
    return (
        <div className={`inline-flex items-center gap-2 ${className}`.trim()}>
            <img
                src='/academia-icon.svg'
                alt='Academia logo'
                className={iconClassName}
            />
            {showText && <span className={textClassName}>ACADEMIA</span>}
        </div>
    );
}
