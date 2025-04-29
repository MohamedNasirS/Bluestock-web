
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  smsAlerts: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings = () => {
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 000-0000",
  });

  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    smsAlerts: false,
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileSettings((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNotificationChange = (key: keyof NotificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast({
      title: "Notification Settings Updated",
      description: `${key === "emailNotifications" ? "Email notifications" : "SMS alerts"} ${
        !notificationPreferences[key] ? "enabled" : "disabled"
      }.`,
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id.replace("-", "") as keyof SecuritySettings;
    setSecuritySettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleUpdatePassword = () => {
    if (
      !securitySettings.currentPassword ||
      !securitySettings.newPassword ||
      !securitySettings.confirmPassword
    ) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would validate the current password and update the password here

    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });

    // Clear the password fields
    setSecuritySettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={profileSettings.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                value={profileSettings.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="+1 (555) 000-0000"
                value={profileSettings.phone}
                onChange={handleProfileChange}
              />
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 mt-2"
              onClick={handleSaveProfile}
            >
              Save Profile
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates about your IPO applications
                </p>
              </div>
              <Switch 
                checked={notificationPreferences.emailNotifications}
                onCheckedChange={() => handleNotificationChange("emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Alerts</Label>
                <p className="text-sm text-gray-500">
                  Get SMS alerts for important updates
                </p>
              </div>
              <Switch 
                checked={notificationPreferences.smsAlerts}
                onCheckedChange={() => handleNotificationChange("smsAlerts")}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="currentPassword" 
                type="password"
                value={securitySettings.currentPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="newPassword" 
                type="password"
                value={securitySettings.newPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={securitySettings.confirmPassword}
                onChange={handleSecurityChange}
              />
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleUpdatePassword}
            >
              Update Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
