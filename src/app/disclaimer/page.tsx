"use client";

import { motion } from "framer-motion";
import { AlertCircle, Cookie, FileWarning } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative py-20 lg:py-28 overflow-hidden border-b bg-muted/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="mx-auto bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <FileWarning className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Disclaimer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Please read the following disclaimer regarding the use of information and services provided by Aspire GlobalLink.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
        >
          <div className="space-y-12">
            
            <section className="flex flex-col md:flex-row gap-6">
              <div className="hidden md:flex flex-shrink-0 mt-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <AlertCircle className="h-7 w-7 text-amber-500" />
                </div>
              </div>
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground m-0 pb-2">General Disclaimer</h2>
                <p>
                  Aspire GlobalLink is not responsible for the accuracy, completeness, or reliability of any content published on this website. The information provided herein is for general informational purposes only. Aspire GlobalLink does not endorse or recommend any individuals, products, or services that may be mentioned across the site.
                </p>
                <p>
                  We explicitly disclaim any liability for damages or claims that may arise from any content, feature, or article presented on this platform. Any opinions or views expressed in the content do not necessarily reflect the policies or viewpoints of Aspire GlobalLink.
                </p>
                <p>
                  Readers and users are encouraged to use their own discretion before relying on any content, information, or material provided here. Under no circumstances shall Aspire GlobalLink be liable to you or any third party for any decision made or action taken based on information found on this website.
                </p>
                <p>
                  This list is not a ranking. The businesses featured in our magazine or on our website represent different segments of the industry and are highlighted for their unique contributions. They are not listed in any order of merit, revenue, or performance. Aspire GlobalLink provides a platform for showcasing products, services, and business stories but does not authenticate or verify the data shared by the featured companies or individuals.
                </p>
                <p>
                  We do not accept responsibility for any inaccurate or outdated information shared in advertorials or user-submitted content. All images, graphics, and media used in such posts are provided by users or organizations themselves. Aspire GlobalLink does not claim ownership of or responsibility for copyright issues related to such content. We are happy to give due credit upon request.
                </p>
                <p>
                  Official communication from Aspire GlobalLink will only be conducted via email addresses associated with our domain such as <strong>aditya@aspiregloballink.com</strong>. We do not communicate using personal emails like Gmail, Yahoo, or others. Aspire GlobalLink is not liable for any communication made through unauthorized channels.
                </p>
              </div>
            </section>

            <section className="flex flex-col md:flex-row gap-6 border-t pt-12">
              <div className="hidden md:flex flex-shrink-0 mt-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Cookie className="h-7 w-7 text-blue-500" />
                </div>
              </div>
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-foreground m-0 pb-2">Understanding Use of Cookies</h2>
                <p>
                  This website may use cookies to enhance your browsing experience and website functionality.
                </p>
                <p>
                  Cookies are small data files saved on your device that store preferences and usage patterns, helping us remember your visits and activity to improve user experience.
                </p>
                <p>
                  Cookies can be categorized as either “persistent” (remain on your device until expiration or manual deletion) or “session” (expire once you close your browser). These cookies generally do not collect personally identifiable information but may include anonymous identifiers and information about browser configuration and site usage.
                </p>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">How We Use Cookies</h3>
                <p>
                  Cookies help us track how users interact with our website, including what pages are visited, how long users stay, and what content receives the most engagement. This enables us to enhance our site and content continually.
                </p>
                <p>
                  We use third-party tools like Google Analytics to gather site traffic data and user behavior insights. These tools do not identify individuals but allow us to monitor our performance and optimize user experience.
                </p>
                <p className="pb-8">
                  We may also partner with third-party advertisers to display relevant ads about our services across different websites. For more information about online advertising practices and your choices, please visit Google’s Advertising Privacy Policy.
                </p>
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
