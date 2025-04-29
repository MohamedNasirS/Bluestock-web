
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  id: number;
  companyName: string;
  category: string;
  bidPrice: string;
  quantity: number;
  amount: string;
  status: "Pending" | "Successful" | "Failed";
}

const initialMockData: Subscription[] = [
  {
    id: 1,
    companyName: "Adani Power",
    category: "Energy",
    bidPrice: "₹329",
    quantity: 150,
    amount: "₹49,350",
    status: "Pending",
  },
  {
    id: 2,
    companyName: "Tata Technologies",
    category: "Technology",
    bidPrice: "₹500",
    quantity: 200,
    amount: "₹100,000",
    status: "Successful",
  },
];

const IPOSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState<Subscription[]>(initialMockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [formData, setFormData] = useState<Partial<Subscription>>({
    companyName: "",
    category: "",
    bidPrice: "",
    quantity: 0,
    amount: "",
    status: "Pending",
  });
  const { toast } = useToast();

  const calculateInvestments = () => {
    return subscriptionData.reduce((total, sub) => {
      const amount = sub.amount.replace(/[₹,]/g, "");
      return total + parseFloat(amount);
    }, 0).toLocaleString("en-IN", { style: "currency", currency: "INR" }).replace(/^(\D+)/, "₹");
  };

  const calculateSuccessRate = () => {
    const successful = subscriptionData.filter(sub => sub.status === "Successful").length;
    return subscriptionData.length > 0 
      ? Math.round((successful / subscriptionData.length) * 100) 
      : 0;
  };

  const handleOpenDialog = (subscription?: Subscription) => {
    if (subscription) {
      setCurrentSubscription(subscription);
      setFormData(subscription);
    } else {
      setCurrentSubscription(null);
      setFormData({
        companyName: "",
        category: "",
        bidPrice: "",
        quantity: 0,
        amount: "",
        status: "Pending",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "quantity" ? parseInt(value) || 0 : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (currentSubscription) {
      // Edit existing subscription
      setSubscriptionData((prevData) =>
        prevData.map((item) =>
          item.id === currentSubscription.id ? { ...item, ...formData } : item
        )
      );
      toast({
        title: "Subscription Updated",
        description: `${formData.companyName} subscription has been updated successfully.`,
      });
    } else {
      // Add new subscription
      const newId = Math.max(0, ...subscriptionData.map((sub) => sub.id)) + 1;
      const newSubscription = { id: newId, ...formData } as Subscription;
      setSubscriptionData((prevData) => [...prevData, newSubscription]);
      toast({
        title: "Subscription Added",
        description: `${formData.companyName} subscription has been added successfully.`,
      });
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (subscription: Subscription) => {
    setCurrentSubscription(subscription);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentSubscription) {
      setSubscriptionData((prevData) => prevData.filter((item) => item.id !== currentSubscription.id));
      toast({
        title: "Subscription Deleted",
        description: `${currentSubscription.companyName} subscription has been deleted successfully.`,
        variant: "destructive",
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">IPO Subscription History</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Investments</h3>
          <p className="text-3xl font-bold text-purple-600">{calculateInvestments()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Active Applications</h3>
          <p className="text-3xl font-bold text-purple-600">{subscriptionData.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
          <p className="text-3xl font-bold text-purple-600">{calculateSuccessRate()}%</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Bid Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptionData.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  {subscription.companyName}
                </TableCell>
                <TableCell>{subscription.category}</TableCell>
                <TableCell>{subscription.bidPrice}</TableCell>
                <TableCell>{subscription.quantity}</TableCell>
                <TableCell>{subscription.amount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      subscription.status === "Successful"
                        ? "bg-green-100 text-green-800"
                        : subscription.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenDialog(subscription)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleOpenDeleteDialog(subscription)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add/Edit Subscription Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentSubscription ? "Edit Subscription" : "Add New Subscription"}
            </DialogTitle>
            <DialogDescription>
              {currentSubscription
                ? "Update the subscription information below."
                : "Enter the details for the new subscription."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bidPrice" className="text-right">
                Bid Price
              </Label>
              <Input
                id="bidPrice"
                name="bidPrice"
                value={formData.bidPrice}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="₹000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="₹0,000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Successful">Successful</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {currentSubscription ? "Save Changes" : "Add Subscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Subscription"
        description={`Are you sure you want to delete ${currentSubscription?.companyName} subscription? This action cannot be undone.`}
      />
    </div>
  );
};

export default IPOSubscription;
