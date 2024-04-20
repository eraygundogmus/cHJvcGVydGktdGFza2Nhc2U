# Installing and Running

1. Clone repository

   ```bash
   git clone git@github.com:eraygundogmus/cHJvcGVydGktdGFza2Nhc2U.git
   ```

2. Go to folder, and copy `.env.example` as `.env`.

   ```bash
   cd cHJvcGVydGktdGFza2Nhc2U/
   cp .env.example .env
   ```

3. Fill the `.env` file with your own values.
4. Install dependencies recommended to use `pnpm` but you can use `npm` or `yarn` as well.

   ```bash
   pnpm install
   ```

5. Run the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

To run _e2e_ tests, you can use the following command:

```bash
pnpm e2e
```

To run _unit_ tests, you can use the following command:

```bash
pnpm unit
```

## Features

### Translation Function

To use the i18n _t_ (translate) function, you can import the `useTranslation` hook from the `@/services/i18n/client` module.

```javascript
import { useTranslation } from "@/services/i18n/client";

const { t } = useTranslation("home");
```

To add a new translation, you can add a new key-value pair to the `locales` object in the `@/services/i18n/locales` module. Or you can add a new locale file to the `@/services/i18n/locales` folder.

### Toaster

To use the toaster, you can use the following methods:

```javascript
import { toast } from "sonner";

toast("message");
```
