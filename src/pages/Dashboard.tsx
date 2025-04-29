
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
import { Eye, Trash2, PenSquare, Plus } from "lucide-react";
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
  company: string;
  priceBand: string;
  open: string;
  close: string;
  issueSize: string;
  issueType: string;
  listingDate: string;
  status: "Ongoing" | "Upcoming" | "Closed";
}

const initialMockData: IPO[] = [
  {
    id: 1,
    company: "Adani Power",
    priceBand: "₹329 - 136",
    open: "2023-06-03",
    close: "2024-06-06",
    issueSize: "45530.15 Cr",
    issueType: "Book Built",
    listingDate: "2023-06-10",
    status: "Ongoing",
  },
  {
    id: 2,
    company: "Tata Technologies",
    priceBand: "₹475 - 500",
    open: "2023-06-15",
    close: "2024-06-18",
    issueSize: "30750.00 Cr",
    issueType: "Book Built",
    listingDate: "2023-06-25",
    status: "Upcoming",
  },
];

const Dashboard = () => {
  const [ipoData, setIpoData] = useState<IPO[]>(initialMockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentIpo, setCurrentIpo] = useState<IPO | null>(null);
  const [formData, setFormData] = useState<Partial<IPO>>({
    company: "",
    priceBand: "",
    open: "",
    close: "",
    issueSize: "",
    issueType: "Book Built",
    listingDate: "",
    status: "Upcoming",
  });
  const { toast } = useToast();

  const handleOpenDialog = (ipo?: IPO) => {
    if (ipo) {
      setCurrentIpo(ipo);
      setFormData(ipo);
    } else {
      setCurrentIpo(null);
      setFormData({
        company: "",
        priceBand: "",
        open: "",
        close: "",
        issueSize: "",
        issueType: "Book Built",
        listingDate: "",
        status: "Upcoming",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleViewIPO = (ipo: IPO) => {
    setCurrentIpo(ipo);
    setIsViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
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
        description: `${formData.company} has been updated successfully.`,
      });
    } else {
      // Add new IPO
      const newId = Math.max(0, ...ipoData.map((ipo) => ipo.id)) + 1;
      const newIpo = { id: newId, ...formData } as IPO;
      setIpoData((prevData) => [...prevData, newIpo]);
      toast({
        title: "IPO Added",
        description: `${formData.company} has been added successfully.`,
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
        description: `${currentIpo.company} has been deleted successfully.`,
        variant: "destructive",
      });
    }
    handleCloseDeleteDialog();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Upcoming IPO | Dashboard</h1>
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
              <TableHead>Company</TableHead>
              <TableHead>Price Band</TableHead>
              <TableHead>Open</TableHead>
              <TableHead>Close</TableHead>
              <TableHead>Issue Size</TableHead>
              <TableHead>Issue Type</TableHead>
              <TableHead>Listing Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipoData.map((ipo) => (
              <TableRow key={ipo.id}>
                <TableCell>{ipo.company}</TableCell>
                <TableCell>{ipo.priceBand}</TableCell>
                <TableCell>{ipo.open}</TableCell>
                <TableCell>{ipo.close}</TableCell>
                <TableCell>{ipo.issueSize}</TableCell>
                <TableCell>{ipo.issueType}</TableCell>
                <TableCell>{ipo.listingDate}</TableCell>
                <TableCell>
                  <span 
                    className={`px-3 py-1 rounded-full text-sm 
                      ${ipo.status === "Ongoing" 
                        ? "bg-green-100 text-green-800" 
                        : ipo.status === "Upcoming" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-gray-100 text-gray-800"}`}>
                    {ipo.status}
                  </span>
                </TableCell>
                <TableCell className="space-x-2">
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
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewIPO(ipo)}
                    >
                      <Eye className="h-4 w-4" />
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
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priceBand" className="text-right">
                Price Band
              </Label>
              <Input
                id="priceBand"
                name="priceBand"
                value={formData.priceBand}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="₹000 - ₹000"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="open" className="text-right">
                Open Date
              </Label>
              <Input
                id="open"
                name="open"
                type="date"
                value={formData.open}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="close" className="text-right">
                Close Date
              </Label>
              <Input
                id="close"
                name="close"
                type="date"
                value={formData.close}
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
                placeholder="00000.00 Cr"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issueType" className="text-right">
                Issue Type
              </Label>
              <Select
                value={formData.issueType}
                onValueChange={(value) => handleSelectChange("issueType", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Book Built">Book Built</SelectItem>
                  <SelectItem value="Fixed Price">Fixed Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="listingDate" className="text-right">
                Listing Date
              </Label>
              <Input
                id="listingDate"
                name="listingDate"
                type="date"
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
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
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

      {/* View IPO Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>IPO Details</DialogTitle>
            <DialogDescription>
              Detailed information about {currentIpo?.company} IPO.
            </DialogDescription>
          </DialogHeader>
          {currentIpo && (
            <div className="py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">Company:</div>
                <div className="col-span-2">{currentIpo.company}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Price Band:</div>
                <div className="col-span-2">{currentIpo.priceBand}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Open Date:</div>
                <div className="col-span-2">{currentIpo.open}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Close Date:</div>
                <div className="col-span-2">{currentIpo.close}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Issue Size:</div>
                <div className="col-span-2">{currentIpo.issueSize}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Issue Type:</div>
                <div className="col-span-2">{currentIpo.issueType}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Listing Date:</div>
                <div className="col-span-2">{currentIpo.listingDate}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div className="font-semibold">Status:</div>
                <div className="col-span-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      currentIpo.status === "Ongoing"
                        ? "bg-green-100 text-green-800"
                        : currentIpo.status === "Upcoming"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {currentIpo.status}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleCloseViewDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDelete}
        title="Delete IPO"
        description={`Are you sure you want to delete ${currentIpo?.company} IPO? This action cannot be undone.`}
      />
    </div>
  );
};

export default Dashboard;
