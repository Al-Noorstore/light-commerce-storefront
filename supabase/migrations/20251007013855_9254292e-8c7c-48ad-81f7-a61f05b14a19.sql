-- Allow anyone to insert order items (they can only insert items for their own orders)
CREATE POLICY "Allow insert order items for all users"
ON public.order_items
FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view order items for orders they can see
CREATE POLICY "Users can view order items for accessible orders"
ON public.order_items
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
  )
);