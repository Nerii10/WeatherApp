export const FadeInType1 = (direction, delay) => {
    return {
        hidden: {
            x: 0, y: -40,
            opacity: 0,

        },

        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
                damping: 10,
                delay: delay || 0,
            },
        },
    };
}
