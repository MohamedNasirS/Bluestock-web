
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, PenSquare, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface Resource {
  id: number;
  title: string;
  description: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  hours: string;
}

const initialFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I apply for an IPO?",
    answer: "To apply for an IPO, navigate to the IPO Subscription page, select the desired IPO, enter the number of shares you wish to apply for, and submit your application. Make sure you have sufficient funds in your account before applying.",
  },
  {
    id: 2,
    question: "How can I check my allotment status?",
    answer: "You can check your allotment status in the IPO Allotment page. Here, you'll find details about your applications, including the number of shares allotted and refund status if applicable.",
  },
  {
    id: 3,
    question: "What happens if I'm not allotted shares?",
    answer: "If you're not allotted shares or are partially allotted, the excess amount will be refunded to your bank account within 5-6 working days from the allotment date.",
  },
];

const initialResources: Resource[] = [
  {
    id: 1,
    title: "User Guide",
    description: "Download our comprehensive user guide to learn more about using the platform effectively.",
  },
  {
    id: 2,
    title: "Video Tutorials",
    description: "Access our library of video tutorials for step-by-step guidance on various features.",
  },
];

const initialContactInfo: ContactInfo = {
  email: "support@bluestock.com",
  phone: "+91 70382 0244",
  hours: "Monday to Friday, 9:00 AM - 5:00 PM",
};

const Help = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialContactInfo);
  
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null);
  const [currentResource, setCurrentResource] = useState<Resource | null>(null);
  const [currentItemType, setCurrentItemType] = useState<"faq" | "resource">("faq");
  
  const [faqFormData, setFaqFormData] = useState<Partial<FAQ>>({
    question: "",
    answer: "",
  });
  
  const [resourceFormData, setResourceFormData] = useState<Partial<Resource>>({
    title: "",
    description: "",
  });
  
  const { toast } = useToast();

  // FAQ handlers
  const handleOpenFaqDialog = (faq?: FAQ) => {
    if (faq) {
      setCurrentFaq(faq);
      setFaqFormData(faq);
    } else {
      setCurrentFaq(null);
      setFaqFormData({
        question: "",
        answer: "",
      });
    }
    setIsFaqDialogOpen(true);
  };

  const handleCloseFaqDialog = () => {
    setIsFaqDialogOpen(false);
  };

  const handleFaqInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFaqFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitFaq = () => {
    if (currentFaq) {
      // Edit existing FAQ
      setFaqs((prevFaqs) =>
        prevFaqs.map((item) =>
          item.id === currentFaq.id ? { ...item, ...faqFormData } : item
        )
      );
      toast({
        title: "FAQ Updated",
        description: "The FAQ has been updated successfully.",
      });
    } else {
      // Add new FAQ
      const newId = Math.max(0, ...faqs.map((faq) => faq.id)) + 1;
      const newFaq = { id: newId, ...faqFormData } as FAQ;
      setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
      toast({
        title: "FAQ Added",
        description: "A new FAQ has been added successfully.",
      });
    }
    handleCloseFaqDialog();
  };

  // Resource handlers
  const handleOpenResourceDialog = (resource?: Resource) => {
    if (resource) {
      setCurrentResource(resource);
      setResourceFormData(resource);
    } else {
      setCurrentResource(null);
      setResourceFormData({
        title: "",
        description: "",
      });
    }
    setIsResourceDialogOpen(true);
  };

  const handleCloseResourceDialog = () => {
    setIsResourceDialogOpen(false);
  };

  const handleResourceInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResourceFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitResource = () => {
    if (currentResource) {
      // Edit existing resource
      setResources((prevResources) =>
        prevResources.map((item) =>
          item.id === currentResource.id ? { ...item, ...resourceFormData } : item
        )
      );
      toast({
        title: "Resource Updated",
        description: "The resource has been updated successfully.",
      });
    } else {
      // Add new resource
      const newId = Math.max(0, ...resources.map((resource) => resource.id)) + 1;
      const newResource = { id: newId, ...resourceFormData } as Resource;
      setResources((prevResources) => [...prevResources, newResource]);
      toast({
        title: "Resource Added",
        description: "A new resource has been added successfully.",
      });
    }
    handleCloseResourceDialog();
  };

  // Contact Info handlers
  const handleOpenContactDialog = () => {
    setIsContactDialogOpen(true);
  };

  const handleCloseContactDialog = () => {
    setIsContactDialogOpen(false);
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitContactInfo = () => {
    toast({
      title: "Contact Info Updated",
      description: "The contact information has been updated successfully.",
    });
    handleCloseContactDialog();
  };

  // Delete handlers
  const handleOpenDeleteDialog = (type: "faq" | "resource", id: number) => {
    setCurrentItemType(type);
    if (type === "faq") {
      setCurrentFaq(faqs.find((f) => f.id === id) || null);
    } else {
      setCurrentResource(resources.find((r) => r.id === id) || null);
    }
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentItemType === "faq" && currentFaq) {
      setFaqs((prevFaqs) => prevFaqs.filter((item) => item.id !== currentFaq.id));
      toast({
        title: "FAQ Deleted",
        description: "The FAQ has been deleted successfully.",
        variant: "destructive",
      });
    } else if (currentItemType === "resource" && currentResource) {
      setResources((prevResources) =>
        prevResources.filter((item) => item.id !== currentResource.id)
      );
      toast({
        title: "Resource Deleted",
        description: "The resource has been deleted successfully.",
        variant: "destructive",
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Help & Support</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleOpenFaqDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                <div className="flex justify-between items-center">
                  <AccordionTrigger className="flex-1 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <div className="flex space-x-2 mr-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFaqDialog(faq);
                      }}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDeleteDialog("faq", faq.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Contact Support</h2>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleOpenContactDialog}
            >
              <PenSquare className="h-4 w-4 mr-2" />
              Edit Contact
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <h3 className="font-semibold">Email Support</h3>
              <p className="text-gray-600">{contactInfo.email}</p>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Phone Support</h3>
              <p className="text-gray-600">{contactInfo.phone}</p>
              <p className="text-sm text-gray-500">{contactInfo.hours}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Resources</h2>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => handleOpenResourceDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>
          <div className="space-y-6">
            {resources.map((resource) => (
              <div key={resource.id} className="grid gap-2 border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenResourceDialog(resource)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleOpenDeleteDialog("resource", resource.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* FAQ Dialog */}
      <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentFaq ? "Edit FAQ" : "Add New FAQ"}
            </DialogTitle>
            <DialogDescription>
              {currentFaq
                ? "Update the FAQ question and answer."
                : "Enter a new question and its answer."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={faqFormData.question}
                onChange={handleFaqInputChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer">Answer</Label>
              <Textarea
                id="answer"
                name="answer"
                value={faqFormData.answer}
                onChange={handleFaqInputChange}
                className="w-full min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseFaqDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmitFaq}>
              {currentFaq ? "Save Changes" : "Add FAQ"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resource Dialog */}
      <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentResource ? "Edit Resource" : "Add New Resource"}
            </DialogTitle>
            <DialogDescription>
              {currentResource
                ? "Update the resource information."
                : "Enter details for the new resource."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={resourceFormData.title}
                onChange={handleResourceInputChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={resourceFormData.description}
                onChange={handleResourceInputChange}
                className="w-full min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseResourceDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmitResource}>
              {currentResource ? "Save Changes" : "Add Resource"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Info Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
            <DialogDescription>
              Update the contact support details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInputChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactInputChange}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hours">Working Hours</Label>
              <Input
                id="hours"
                name="hours"
                value={contactInfo.hours}
                onChange={handleContactInputChange}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseContactDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmitContactInfo}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title={`Delete ${currentItemType === "faq" ? "FAQ" : "Resource"}`}
        description={
          currentItemType === "faq"
            ? `Are you sure you want to delete this FAQ? This action cannot be undone.`
            : `Are you sure you want to delete this resource? This action cannot be undone.`
        }
      />
    </div>
  );
};

export default Help;
