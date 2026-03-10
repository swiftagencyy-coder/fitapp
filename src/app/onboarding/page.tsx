import { OnboardingForm } from '@/components/features/onboarding/OnboardingForm';

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-background py-20 px-6 relative overflow-hidden">
            {/* Visual Depth */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                        Construct Your <br /><span className="text-primary italic">Protocol.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg uppercase font-bold tracking-[0.2em] max-w-xl mx-auto">
                        Bio-syncing active. Please define your parameters.
                    </p>
                </div>

                <OnboardingForm />
            </div>
        </div>
    );
}
