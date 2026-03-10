import { OnboardingForm } from '@/components/features/onboarding/OnboardingForm';

export default function OnboardingPage() {
    return (
        <div className="min-h-screen bg-black py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        CUSTOMIZE YOUR <span className="text-primary italic">PLAN.</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Answer a few questions so our AI can architect the perfect training protocol for your physiology.
                    </p>
                </div>

                <OnboardingForm />
            </div>
        </div>
    );
}
