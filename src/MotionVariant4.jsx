export const FadeInType4 = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 25: direction === 'down' ? -30 : 0,
            x: direction === 'right' ? 50 : direction === 'left' ? -50 : 0,
            opacity: 0,
            scale: 0,
            rotate: 15,
        },

        show: {
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
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
};
