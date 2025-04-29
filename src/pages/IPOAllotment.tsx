
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

interface Allotment {
  id: number;
  companyName: string;
  allotmentDate: string;
  sharesApplied: number;
  sharesAllotted: number;
  refundAmount: string;
  status: "Full" | "Partial" | "None";
}

const initialMockData: Allotment[] = [
  {
    id: 1,
    companyName: "Adani Power",
    allotmentDate: "2024-06-15",
    sharesApplied: 150,
    sharesAllotted: 75,
    refundAmount: "₹24,675",
    status: "Partial",
  },
  {
    id: 2,
    companyName: "Tata Technologies",
    allotmentDate: "2024-07-20",
    sharesApplied: 200,
    sharesAllotted: 200,
    refundAmount: "₹0",
    status: "Full",
  },
];

const IPOAllotment = () => {
  const [allotmentData, setAllotmentData] = useState<Allotment[]>(initialMockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAllotment, setCurrentAllotment] = useState<Allotment | null>(null);
  const [formData, setFormData] = useState<Partial<Allotment>>({
    companyName: "",
    allotmentDate: "",
    sharesApplied: 0,
    sharesAllotted: 0,
    refundAmount: "₹0",
    status: "None",
  });
  const { toast } = useToast();

  const calculateTotalShares = () => {
    return allotmentData.reduce((total, allotment) => total + allotment.sharesAllotted, 0);
  };

  const calculateTotalRefund = () => {
    return allotmentData
      .reduce((total, allotment) => {
        const refund = allotment.refundAmount.replace(/[₹,]/g, "");
        return total + parseFloat(refund || "0");
      }, 0)
      .toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })
      .replace(/^(\D+)/, "₹");
  };

  const handleOpenDialog = (allotment?: Allotment) => {
    if (allotment) {
      setCurrentAllotment(allotment);
      setFormData(allotment);
    } else {
      setCurrentAllotment(null);
      setFormData({
        companyName: "",
        allotmentDate: "",
        sharesApplied: 0,
        sharesAllotted: 0,
        refundAmount: "₹0",
        status: "None",
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
      [name]: ["sharesApplied", "sharesAllotted"].includes(name)
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (currentAllotment) {
      // Edit existing allotment
      setAllotmentData((prevData) =>
        prevData.map((item) =>
          item.id === currentAllotment.id ? { ...item, ...formData } : item
        )
      );
      toast({
        title: "Allotment Updated",
        description: `${formData.companyName} allotment has been updated successfully.`,
      });
    } else {
      // Add new allotment
      const newId = Math.max(0, ...allotmentData.map((allot) => allot.id)) + 1;
      const newAllotment = { id: newId, ...formData } as Allotment;
      setAllotmentData((prevData) => [...prevData, newAllotment]);
      toast({
        title: "Allotment Added",
        description: `${formData.companyName} allotment has been added successfully.`,
      });
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (allotment: Allotment) => {
    setCurrentAllotment(allotment);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentAllotment) {
      setAllotmentData((prevData) => prevData.filter((item) => item.id !== currentAllotment.id));
      toast({
        title: "Allotment Deleted",
        description: `${currentAllotment.companyName} allotment has been deleted successfully.`,
        variant: "destructive",
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">IPO Allotment Status</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Allotment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-purple-600">{allotmentData.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Shares Allotted</h3>
          <p className="text-3xl font-bold text-purple-600">{calculateTotalShares()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Refund</h3>
          <p className="text-3xl font-bold text-purple-600">{calculateTotalRefund()}</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Allotment Date</TableHead>
              <TableHead>Shares Applied</TableHead>
              <TableHead>Shares Allotted</TableHead>
              <TableHead>Refund Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allotmentData.map((allotment) => (
              <TableRow key={allotment.id}>
                <TableCell className="font-medium">
                  {allotment.companyName}
                </TableCell>
                <TableCell>{allotment.allotmentDate}</TableCell>
                <TableCell>{allotment.sharesApplied}</TableCell>
                <TableCell>{allotment.sharesAllotted}</TableCell>
                <TableCell>{allotment.refundAmount}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      allotment.status === "Full"
                        ? "bg-green-100 text-green-800"
                        : allotment.status === "Partial"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {allotment.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenDialog(allotment)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleOpenDeleteDialog(allotment)}
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

      {/* Add/Edit Allotment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentAllotment ? "Edit Allotment" : "Add New Allotment"}
            </DialogTitle>
            <DialogDescription>
              {currentAllotment
                ? "Update the allotment information below."
                : "Enter the details for the new allotment."}
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
              <Label htmlFor="allotmentDate" className="text-right">
                Allotment Date
              </Label>
              <Input
                id="allotmentDate"
                name="allotmentDate"
                type="date"
                value={formData.allotmentDate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sharesApplied" className="text-right">
                Shares Applied
              </Label>
              <Input
                id="sharesApplied"
                name="sharesApplied"
                type="number"
                value={formData.sharesApplied}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sharesAllotted" className="text-right">
                Shares Allotted
              </Label>
              <Input
                id="sharesAllotted"
                name="sharesAllotted"
                type="number"
                value={formData.sharesAllotted}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="refundAmount" className="text-right">
                Refund Amount
              </Label>
              <Input
                id="refundAmount"
                name="refundAmount"
                value={formData.refundAmount}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="₹0"
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
                  <SelectItem value="Full">Full</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {currentAllotment ? "Save Changes" : "Add Allotment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Allotment"
        description={`Are you sure you want to delete ${currentAllotment?.companyName} allotment? This action cannot be undone.`}
      />
    </div>
  );
};

export default IPOAllotment;
