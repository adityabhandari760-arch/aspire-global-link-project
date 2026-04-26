import { Shield, Lock, Eye, Mail, Server, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Aspire GlobalLink",
  description: "Learn about how Aspire GlobalLink collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header Section */}
      <div className="relative py-20 lg:py-28 overflow-hidden border-b bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Your privacy is critically important to us. Learn how we handle your personal data to provide a safe and secure experience.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-16">
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          
          <div className="bg-card border shadow-sm rounded-[1.5rem] p-8 md:p-10 mb-10">
            <p className="lead text-xl text-foreground font-medium mb-0">
              Aspire GlobalLink operates <strong>www.aspiregloballink.com</strong>. If you have any queries regarding the site or content that is present on site, you may directly contact us at <a href="mailto:aditya@aspiregloballink.com" className="text-primary hover:underline font-semibold">aditya@aspiregloballink.com</a>.
            </p>
            <p className="mt-4">
              We are a dynamic media platform, and try to explore different business fields such as IT, Healthcare, Manufacturing, Finance, Education, Export, Import etc.
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Section 1 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Personal Identification Information</h2>
                <p>
                  We may collect PII from Users in different ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for name, email address, mailing address while completing one of these activities.
                </p>
                <p>
                  Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they intentionally submit such information to us. Users can always refuse to supply personally identification information, which can stop them from interacting with certain Site related activities.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Server className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Collection and Usage</h2>
                <p>
                  We only use information which is available on internet platforms (Work Email, Office Contact Number), when approaching website visitor through e-mails. It is collected through our website or other communication channels such as email or phone. User can decide to opt out from our emails at any time.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Who Collects this Data?</h2>
                <p>
                  The data is solely collected by Aspire GlobalLink from the information that is available on public internet domains. We do not use any third parties to collect data.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Will my Data be shared?</h2>
                <p>
                  We do not sell, trade, or rent Users’ personal identification information to others. If any incidences arise, where there is a need to share information/data, it will only be done with visitor’s explicit permission and only for as long as is necessary.
                </p>
                <p>
                  We use third-party applications for our day-to-day business operations. Below is a list of such tools, you can go through their GDPR Compliance Statements:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li><strong>The Website:</strong> Uses fully encrypted SSL Certificate for data protection.</li>
                  <li><strong>Google Workspace:</strong> Google Drive and different formats under it such as Google Sheets, Google Docs are used for daily business operations.</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">What Rights Does the Visitor Have?</h2>
                <p>
                  Visitors have the right to view the information we hold. If one wishes to see so, please contact us at <a href="mailto:aditya@aspiregloballink.com" className="text-primary hover:underline font-semibold">aditya@aspiregloballink.com</a>.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="flex gap-4 md:gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-1">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes Notification</h2>
                <p>
                  We review our security measures and Privacy Policy on a periodic basis, and think to update the same from time to time. We may also change or update our Privacy Policy if we add new products, services, or sections, and the same will be posted here.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
