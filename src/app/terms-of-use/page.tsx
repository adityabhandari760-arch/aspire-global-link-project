"use client";

import { motion } from "framer-motion";
import { FileText, ShieldAlert, BadgeInfo } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative py-20 lg:py-28 overflow-hidden border-b bg-muted/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background z-0" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
            Terms of Use
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website and services at Aspire GlobalLink.
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
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Terms and Conditions</h2>
              <ol className="list-decimal pl-5 space-y-4">
                <li>The website visitor must be at least 18 years old, in order to use Aspire Globallink Website. (www.aspiregloballink.com)</li>
                <li>Aspire Globallink hereby grants you the permission to view this website and to use it purely for general informational and non-commercial purposes.</li>
                <li>Aspire Globallink owns intellectual property rights for the content, designs, processes, models, products, software or ideas described in this website.</li>
                <li>Distribution, Changes, Reuse/ Repost of our content without appropriate credits to Aspire Globallink is strictly prohibited. One may always share, distribute, and post our intellectual property by giving proper credits to us.</li>
                <li>This site (www.aspiregloballink.com) contains several links pointing to other websites. Aspire Globallink will not be responsible for the content or for any consequences of visiting sites that are linked to this site.</li>
                <li>The Information provided by Aspire Globallink, through emails is exclusively intended for the addressee. Use of the information by any party other than the addressee is prohibited.</li>
                <li>All the content on this website is published for basic information purpose only. Aspire Globallink (www.aspiregloballink.com does not make any conclusions or warranties about the reliability and accuracy of this information. Any action taken by you upon the information you find on this website, is strictly at your own risk. Aspire Globallink will not be responsible for any losses and/or damages in continuation with the use of our website.</li>
                <li>You can visit other websites from our website by following hyperlinks. We don’t have any kind of control on the content, images and posts published on those websites. We do ensure to provide quality content to our website and constantly check for such links. If we find any suspicious link, it will be removed immediately, without any notice given.</li>
                <li>When you leave this site to next site, it has different privacy policies and terms of use, for which Aspire Globallink is not responsible.</li>
                <li>The content that is shared on this website, or other social media platforms including, but not only, Facebook, LinkedIn, Twitter, Pinterest, Tumblr, Google+ etc. are views of individual blogger, writer or it’s source. Aspire Globallink does not necessarily approve their opinions.</li>
                <li>We periodically check content of comments on different social media platforms. If we find any abusive, misleading, vulgar and negative content, such comments or sentences will be permanently deleted without informing the writer.</li>
              </ol>
            </section>
            
            <section className="bg-card p-6 md:p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-3 text-foreground mb-4"><ShieldAlert className="h-6 w-6 text-primary"/> Cancellation Policy</h2>
              <p className="m-0 leading-relaxed">
                As we are a service provider, we do not accept cancellations once the process is started/ completed. We collect payments with our official business name Aspire Globallink.
              </p>
            </section>
            
            <section className="bg-card p-6 md:p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-3 text-foreground mb-4"><BadgeInfo className="h-6 w-6 text-primary"/> Refund Policy</h2>
              <p className="m-0 leading-relaxed">
                As we are a service provider, we do not provide refunds once the process is started/ completed. If the service is yet to be provided, client can request for refund. The usual TAT is 30 Working Days.
              </p>
            </section>
            
            <section className="pt-4">
              <h2 className="text-2xl font-bold text-foreground mb-3">Consent of Reader</h2>
              <p className="pb-8 leading-relaxed">
                By using our website, you hereby agree to our disclaimer, terms and policies.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
