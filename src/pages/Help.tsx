
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Help & Support</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I apply for an IPO?</AccordionTrigger>
              <AccordionContent>
                To apply for an IPO, navigate to the IPO Subscription page, select
                the desired IPO, enter the number of shares you wish to apply for,
                and submit your application. Make sure you have sufficient funds in
                your account before applying.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                How can I check my allotment status?
              </AccordionTrigger>
              <AccordionContent>
                You can check your allotment status in the IPO Allotment page.
                Here, you'll find details about your applications, including the
                number of shares allotted and refund status if applicable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What happens if I'm not allotted shares?
              </AccordionTrigger>
              <AccordionContent>
                If you're not allotted shares or are partially allotted, the excess
                amount will be refunded to your bank account within 5-6 working
                days from the allotment date.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-gray-600">support@bluestock.com</p>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-gray-600">+91 70382 0244</p>
              <p className="text-sm text-gray-500">
                Available Monday to Friday, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="font-semibold">User Guide</h3>
              <p className="text-gray-600">
                Download our comprehensive user guide to learn more about using the
                platform effectively.
              </p>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Video Tutorials</h3>
              <p className="text-gray-600">
                Access our library of video tutorials for step-by-step guidance on
                various features.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Help;
