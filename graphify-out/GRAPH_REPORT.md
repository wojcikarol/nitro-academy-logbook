# Graph Report - nitro-academy-logbook  (2026-06-02)

## Corpus Check
- 99 files · ~25,808 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 727 nodes · 1015 edges · 56 communities (46 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `832b8a24`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 73 edges
2. `useStore()` - 22 edges
3. `compilerOptions` - 18 edges
4. `Carousel` - 17 edges
5. `compilerOptions` - 13 edges
6. `Pagination()` - 11 edges
7. `scripts` - 9 edges
8. `FileRoutesByPath` - 8 edges
9. `scripts` - 8 edges
10. `aliases` - 7 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `PaginationNext()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/pagination.tsx → src/lib/utils.ts
- `SheetFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/sheet.tsx → src/lib/utils.ts
- `DrawerHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/drawer.tsx → src/lib/utils.ts

## Communities (56 total, 10 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.04
Nodes (55): dependencies, class-variance-authority, @cloudflare/vite-plugin, clsx, cmdk, convex, date-fns, embla-carousel-react (+47 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (33): getAppData, create, list, remove, setSelectedCar(), toggleFavorite, update, ensureSessionDashboard() (+25 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (38): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+30 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (17): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+9 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (42): CarForm(), DriverForm(), Field, FieldProps, FormValues, schema, FuelPanel(), Garage() (+34 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (29): OwnerMode, Header(), NAV, defaultCars, defaults, defaultUsers, api, components (+21 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (21): auxiliaryWorkers, configPath, compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleResolution (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (15): cn(), Checkbox, HoverCardContent, PopoverContent, Progress, RadioGroup, RadioGroupItem, ResizableHandle() (+7 more)

### Community 9 - "Community 9"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (15): compilerOptions, allowJs, allowSyntheticDefaultImports, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.25
Nodes (9): consumeLastCapturedError(), renderErrorPage(), brandedErrorResponse(), fetch(), getServerEntry(), isCatastrophicSsrErrorBody(), normalizeCatastrophicSsrResponse(), ServerEntry (+1 more)

### Community 14 - "Community 14"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.26
Nodes (14): Button, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.26
Nodes (12): ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 17 - "Community 17"
Cohesion: 0.27
Nodes (8): name, private, sideEffects, type, name, private, sideEffects, type

### Community 18 - "Community 18"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 20 - "Community 20"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.43
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 23 - "Community 23"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 24 - "Community 24"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 25 - "Community 25"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 26 - "Community 26"
Cohesion: 0.29
Nodes (6): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, convex, dev, format, lint, preview

### Community 28 - "Community 28"
Cohesion: 0.33
Nodes (5): ActionCtx, DatabaseReader, DatabaseWriter, MutationCtx, QueryCtx

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (5): fuelType, DataModel, Doc, Id, TableNames

### Community 30 - "Community 30"
Cohesion: 0.47
Nodes (4): aiFiles, enabled, functions, $schema

### Community 31 - "Community 31"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, convex, dev, format, lint, preview

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 33 - "Community 33"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 34 - "Community 34"
Cohesion: 0.04
Nodes (55): dependencies, class-variance-authority, @cloudflare/vite-plugin, clsx, cmdk, convex, date-fns, embla-carousel-react (+47 more)

### Community 35 - "Community 35"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 36 - "Community 36"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 37 - "Community 37"
Cohesion: 0.36
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "Community 38"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

### Community 39 - "Community 39"
Cohesion: 0.12
Nodes (17): devDependencies, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals (+9 more)

### Community 44 - "Community 44"
Cohesion: 0.20
Nodes (9): ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut(), ContextMenuSubContent (+1 more)

### Community 56 - "Community 56"
Cohesion: 0.20
Nodes (9): assetsDir, clientDir, cssFiles, cssLinks, distDir, entryFile, jsFiles, rootAssetsDir (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.50
Nodes (3): AccordionContent, AccordionItem, AccordionTrigger

## Knowledge Gaps
- **426 isolated node(s):** `dev`, `build`, `build:dev`, `preview`, `lint` (+421 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 8` to `Community 2`, `Community 9`, `Community 10`, `Community 14`, `Community 15`, `Community 16`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 32`, `Community 33`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 44`, `Community 57`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 0` to `Community 17`, `Community 27`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 34` to `Community 17`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `dev`, `build`, `build:dev` to the rest of the system?**
  _426 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.03636363636363636 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08080808080808081 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._