import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';

function Onboarding() {
  const prefersReducedMotion = useReducedMotion();
  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl items-center px-6 py-16 sm:px-10">
        <motion.section
          className="max-w-xl rounded-3xl border border-secondary bg-neutral p-8 shadow-sm sm:p-12"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: prefersReducedMotion ? 0 : 0.12, duration: 0.4 }}
          >
            Welcome to Kinetic
          </motion.p>
          <motion.h1
            className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: 0.4 }}
          >
            Start with one small step.
          </motion.h1>
          <motion.p
            className="mt-4 leading-7 text-secondary"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: prefersReducedMotion ? 0 : 0.28, duration: 0.4 }}
          >
            Your workspace is ready. Head to your todo list to see what needs your attention.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.36, duration: 0.4 }}
          >
            <motion.span className="inline-flex" whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}>
              <Link className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-neutral transition-colors duration-200 hover:bg-secondary" to="/home">
                Next
              </Link>
            </motion.span>
            <motion.span className="inline-flex" whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}>
              <Link className="inline-flex rounded-lg border border-tertiary px-5 py-3 text-sm font-semibold text-tertiary transition-colors duration-200 hover:bg-tertiary hover:text-neutral" to="/signup">
                Sign up
              </Link>
            </motion.span>
            <motion.span className="inline-flex" whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}>
              <Link className="inline-flex rounded-lg border border-tertiary px-5 py-3 text-sm font-semibold text-tertiary transition-colors duration-200 hover:bg-tertiary hover:text-neutral" to="/login">
                Log in
              </Link>
            </motion.span>
          </motion.div>
        </motion.section>
      </main>
    </div>
  )
}

export default Onboarding
