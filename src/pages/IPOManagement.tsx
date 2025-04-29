
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

interface IPO {
  id: number;
  companyName: string;
  category: string;
  issueSize: string;
  issuePrice: string;
  listingDate: string;
  status: "Active" | "Draft";
}

const initialMockData: IPO[] = [
  {
    id: 1,
    companyName: "Adani Power",
    category: "Energy",
    issueSize: "45530.15 Cr",
    issuePrice: "₹329 - 136",
    listingDate: "2024-06-10",
    status: "Active",
  },
  {
    id: 2,
    companyName: "Tata Technologies",
    category: "Technology",
    issueSize: "30750.00 Cr",
    issuePrice: "₹475 - 500",
    listingDate: "2024-07-15",
    status: "Draft",
  },
];

const IPOManagement = () => {
  const [ipoData, setIpoData] = useState<IPO[]>(initialMockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentIpo, setCurrentIpo] = useState<IPO | null>(null);
  const [formData, setFormData] = useState<Partial<IPO>>({
    companyName: "",
    category: "",
    issueSize: "",
    issuePrice: "",
    listingDate: "",
    status: "Draft",
  });
  const { toast } = useToast();

  const handleOpenDialog = (ipo?: IPO) => {
    if (ipo) {
      setCurrentIpo(ipo);
      setFormData(ipo);
    } else {
      setCurrentIpo(null);
      setFormData({
        companyName: "",
        category: "",
        issueSize: "",
        issuePrice: "",
        listingDate: "",
        status: "Draft",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (currentIpo) {
      // Edit existing IPO
      setIpoData((prevData) =>
        prevData.map((item) =>
          item.id === currentIpo.id ? { ...item, ...formData } : item
        )
      );
      toast({
        title: "IPO Updated",
        description: `${formData.companyName} has been updated successfully.`,
      });
    } else {
      // Add new IPO
      const newId = Math.max(0, ...ipoData.map((ipo) => ipo.id)) + 1;
      const newIpo = { id: newId, ...formData } as IPO;
      setIpoData((prevData) => [...prevData, newIpo]);
      toast({
        title: "IPO Added",
        description: `${formData.companyName} has been added successfully.`,
      });
    }
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = (ipo: IPO) => {
    setCurrentIpo(ipo);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    if (currentIpo) {
      setIpoData((prevData) => prevData.filter((item) => item.id !== currentIpo.id));
      toast({
        title: "IPO Deleted",
        description: `${currentIpo.companyName} has been deleted successfully.`,
        variant: "destructive",
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">IPO Management</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New IPO
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Issue Size</TableHead>
              <TableHead>Issue Price</TableHead>
              <TableHead>Listing Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipoData.map((ipo) => (
              <TableRow key={ipo.id}>
                <TableCell className="font-medium">{ipo.companyName}</TableCell>
                <TableCell>{ipo.category}</TableCell>
                <TableCell>{ipo.issueSize}</TableCell>
                <TableCell>{ipo.issuePrice}</TableCell>
                <TableCell>{ipo.listingDate}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      ipo.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {ipo.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleOpenDialog(ipo)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600"
                      onClick={() => handleOpenDeleteDialog(ipo)}
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

      {/* Add/Edit IPO Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentIpo ? "Edit IPO" : "Add New IPO"}
            </DialogTitle>
            <DialogDescription>
              {currentIpo
                ? "Update the IPO information below."
                : "Enter the details for the new IPO."}
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
              <Label htmlFor="issueSize" className="text-right">
                Issue Size
              </Label>
              <Input
                id="issueSize"
                name="issueSize"
                value={formData.issueSize}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issuePrice" className="text-right">
                Issue Price
              </Label>
              <Input
                id="issuePrice"
                name="issuePrice"
                value={formData.issuePrice}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="listingDate" className="text-right">
                Listing Date
              </Label>
              <Input
                id="listingDate"
                name="listingDate"
                value={formData.listingDate}
                onChange={handleInputChange}
                className="col-span-3"
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {currentIpo ? "Save Changes" : "Add IPO"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Delete IPO"
        description={`Are you sure you want to delete ${currentIpo?.companyName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default IPOManagement;
