import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import atlas from '../assets/atlas.png';
import words from '../assets/words.png';

const LogoSection = () => {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            {/* Atlas image (static) */}
            <Box component="img" src={atlas} alt="atlas logo" height={70} />

            {/* Animated words image looping in and out */}
            <motion.img
                src={words}
                alt="infoatlas text"
                height={70}
                animate={{
                    x: [-30, 0, 0, -30], // Added extra 0 for a hold position in the middle
                    opacity: [0, 1, 1, 0], // Hold opacity at 1 for the pause period
                }}
                transition={{
                    duration: 10, // Total duration, including pause time
                    times: [0, 0.01, 0.8, 1], // Quick fade in (0 -> 0.05), hold (0.05 -> 0.95), slow out (0.95 -> 1)
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
            />
        </Box>
    );
};

export default LogoSection;
