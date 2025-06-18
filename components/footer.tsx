export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-2">AI Tools Directory</h3>
            <p className="text-sm text-muted-foreground">Discover and favorite the best AI tools</p>
          </div>

          <div className="text-center md:text-right">
            <p className="font-medium mb-1">Developed by Harsh Yadav</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>📞 9125144255</p>
              <p>✉️ meharshyadav786@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AI Tools Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
