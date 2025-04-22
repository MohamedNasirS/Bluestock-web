
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

const mockData = [
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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">IPO Management</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
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
            {mockData.map((ipo) => (
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
                    <Button variant="ghost" size="icon">
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default IPOManagement;
